import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import { Strategy as NaverStrategy } from "passport-naver-v2";
dotenv.config();

export const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
        clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
        callbackURL: "http://http://15.165.95.120:3000//oauth2/callback/google",
        scope: ["email", "profile"],
        state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
        console.log(profile);
        return googleVerify(profile)
            .then((member) => cb(null, member))
            .catch((err) => cb(err));
    }
);


export const googleVerify = async (profile)=>{
    const email = profile.emails?.[0]?.value;

    if(!email){
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const member = await prisma.member.findFirst({where:{email}});
    if(member !== null){
        return {id : member.id, email: member.email, name: member.name};
    }

    const created = await prisma.member.create({
        data:{
            email,
            name: profile.displayName,
            gender: "추후 수정",
            birth: new Date(1970,0,1),
            location: "추후 수정",
            point: 0,
            uId: email,
            pwd: "0000",
            status: "추후 수정",
            inactiveDate: new Date(1970,0,1),
        },
    });

    return {id: created.id, email: created.email, name: created.name};
}


export const naverStrategy = new NaverStrategy(
    {
        clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
        clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
        callbackURL: "http://15.165.95.120:3000//oauth/naver/callback",
        scope: ["email", "profile"],
        state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
        return naverVerify(profile)
            .then((member) => cb(null, member))
            .catch((err) => cb(err));
    }
);

export const naverVerify = async (profile)=>{
    const email = profile.email;

    if(!email){
        throw new Error(`profile.email was not found: ${profile}`)
    }

    const member = await prisma.member.findFirst({where:{email}});
    if(member !== null){
        return {id : member.id, email: member.email, name: member.name};
    }

    const created = await prisma.member.create({
        data:{
            email,
            name: profile.name,
            gender: "추후 수정",
            birth: new Date(1970,0,1),
            location: "추후 수정",
            point: 0,
            uId: email,
            pwd: "0000",
            status: "추후 수정",
            inactiveDate: new Date(1970,0,1),
        },
    });

    return {id: created.id, email: created.email, name: created.name};
}
