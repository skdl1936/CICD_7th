import dotenv from 'dotenv';
import express, {json} from 'express'
import cors from 'cors';
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import {googleStrategy, naverStrategy} from "./auth.config.js";
import { prisma } from "./db.config.js";

import {handleMemberUpdate, handleUserSignUp} from "./controllers/user.controller.js";
import {handleListStoreMission, handleStoreMission} from "./controllers/storeMission.controller.js";
import {handleListMemberReviews, handleListStoreReviews, handleUserReview} from "./controllers/review.controller.js";
import {handleMemberMissionComplete, handleUserMission} from "./controllers/userMission.controller.js";


dotenv.config();

passport.use(googleStrategy);
passport.use(naverStrategy);
passport.serializeUser((member,done) => done(null, member));
passport.deserializeUser((member,done) => done(null, member));

const app = express()
const port = process.env.PORT;


// 공통 응답을 사용할 수 있는 헬퍼 함수 등록
app.use((req,res,next)=>{
    res.success = (success) =>{
        return res.json({
            resultType: "SUCCESS",
            error: null,
            success: success
        });
    };

    res.error = ({ errorCode = "unknown" , reason = null, data = null}) =>{
        return res.json({
            resultType: "FAIL",
            error: {errorCode, reason, data},
            success: null,
        });
    };

    next();
})

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* 스웨거  */
app.use(
    "/docs",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup({},{
        swaggerOptions:{
            url: "/openapi.json",
        },
    })
);


app.get("/openapi.json", async (req,res,next)=>{
    // #swagger.ignore = true
    const options = {
        openapi: "3.0.0",
        disableLogs: true,
        writeOutputFile: false,
    };

    const outputFile = "/dev/null";
    const routes = ["./src/index.js"];
    const doc = {
        info:{
            title: "UMC 7th",
            description: "UMC 7th Node.js 테스트 프로젝트입니다.",
        },
        host: "localhost:3000",
    };

    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    res.json(result ? result.data : null);
})

////////////////////////////////////
app.use(
    session({
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        },
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000, // ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

//구글로 로그인하기 라우터
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
    "/oauth2/callback/google",
    passport.authenticate("google", {
        failureRedirect: "/oauth2/login/google",
        failureMessage: true,
    }),
    (req, res) => res.redirect("/")
);

// 네이버로 로그인하기 라우터
app.get('/oauth2/login/naver', passport.authenticate("naver"));
app.get(
    '/oauth/naver/callback',
    passport.authenticate('naver',{
        failureRedirect: "/oauth/login/callback",
        failureMessage: true,
    }),
    (req,res) => res.redirect("/")
);





app.get('/', (req,res)=>{
    // #swagger.ignore = true
    console.log(req.user)
    res.send('hello world!')
})

// 유저 회원가입
app.post("/users/signUp", handleUserSignUp);

// 가게에 리뷰 추가
app.post(`/members/:memberId/stores/:storeId/review`, handleUserReview );

// 가게에 미션 등록
app.post(`/store/:storeId/missions`, handleStoreMission );

// 유저한테 미션추가
app.post(`/missions/:missionId/member/:memberId`, handleUserMission );

// 가게 리뷰목록 출력 // 워크북
app.get('/api/v1/stores/:storeId/reviews', handleListStoreReviews );

// 내가 작성한 리뷰 목록
app.get('/api/v1/members/:memberId/reviews', handleListMemberReviews );

// 특정 가게의 미션 목록
app.get('/api/v1/stores/:storeId/missions', handleListStoreMission);

// 진행완료로 바꾸기
app.patch('/members/:memberId/missions/:missionId/:status', handleMemberMissionComplete );

// 회원정보 수정하기
app.patch('/members/:memberId/modify', handleMemberUpdate);

// 전역 오류를 처리하기 위한 미들웨어
app.use((err,req,res,next) =>{
    if(res.headersSent){
        return next(err);
    }
    console.log(err)
    res.status(err.statusCode || 500).error({
        errorCode: err.errorCode || 'unknown',
        reason: err.reson || err.message || null,
        data: err.data || null,
    });
});



app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})

