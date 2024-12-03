import {listMemberReviews, listStoreReviews, userReview} from "../services/review.service.js";
import {bodyToReview} from "../dtos/review.dto.js";
import {StatusCodes} from "http-status-codes";


export const handleUserReview = async (req,res, next)=>{
    console.log("리뷰작성을 요청했습니다.");

    const review = await userReview(bodyToReview(req.body,req.params));
    res.status(StatusCodes.OK).success(review);
    /*
    #swagger.summary = '가게 리뷰 추가 요청 API';
    #swagger.requestBody = {
        content:{
            "application/json": {
                schema: {
                    type: "object",
                    properties:{
                        member_id: {type : "integer"},
                        store_id: {type: "integer"},
                        score: {type: "string"},
                        context: {type: "string"}
                    }
                }
            }
        }
    }
    #swagger.responses[200] = {
        description : "가게 리뷰 추가 요청 성공 응답",
        content: {
            "application/json":{
                schema:{
                    type: "object",
                    properties:{
                        resultType: { type: "string", example: "SUCCESS"},
                        error: {type: "object", nullable: true, example: null },
                        success:{
                            type: "object",
                            properties:{
                                id: {type: "integer"},
                                storeId: {type: "integer"},
                                memberId: {type: "integer"},
                                score: {type: "string"},
                                context: {type: "string"},
                                createAt: {type: "string", format: "date"}
                            }
                        }
                    }
                }
            }
        }
    }

    #swagger.responses[400] = {
        description : "가게 리뷰 추가 요청 실패 응답",
        content: {
            "application/json":{
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL"},
                        error: {
                            type: "object",
                            properties:{
                                errorCode: { type: "string", example: "U002" },
                                reason: {type : "string"},
                                data: {type : "object"}
                            }
                        },
                        success: {type: "object", nullable: true, example: null }
                    }
                }
            }
        }
    };
    */

}

// 가게 리뷰목록 불러오기
export const handleListStoreReviews = async (req,res,next) =>{
    console.log("해당 가게의 리뷰 목록 불러오기")

    const reviews = await listStoreReviews(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);

    /*
   #swagger.summary = '상점 리뷰 목록 조회 API';
   #swagger.responses[200] = {
     description: "상점 리뷰 목록 조회 성공 응답",
     content: {
       "application/json": {
         schema: {
           type: "object",
           properties: {
             resultType: { type: "string", example: "SUCCESS" },
             error: { type: "object", nullable: true, example: null },
             success: {
               type: "object",
               properties: {
                 data: {
                   type: "array",
                   items: {
                     type: "object",
                     properties: {
                       id: { type: "number" },
                       store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                       user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                       content: { type: "string" }
                     }
                   }
                 },
                 pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
               }
             }
           }
         }
       }
     }
   };

 */
}

//내가 작성한 리뷰 목록 출력
export const handleListMemberReviews = async (req,res,next) =>{
    console.log("내가 작성한 리뷰 목록 불러오기");

    const reviews = await listMemberReviews(
        parseInt(req.params.memberId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );

    res.status(StatusCodes.OK).success(reviews);

    /*
    #swagger.summary = "사용자 작성한 리뷰 목록 출력 API";
    #swagger.responses[200] = {
        description: "리뷰 조회 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "SUCCESS" },
                        error: { type: "null", example: null },
                        success: {
                            type: "object",
                            properties: {
                                data: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer" },
                                        storeId: { type: "integer"},
                                        memberId: { type: "integer" },
                                        score: { type: "string"},
                                        context: { type: "string" },
                                        member: {
                                            type: "object",
                                            properties: {
                                                id: { type: "integer"},
                                                name: { type: "string" },
                                                uid: { type: "string" },
                                                pwd: { type: "string" },
                                                email: { type: "string" },
                                                createAt: { type: "string", format: "date" },
                                                updateAt: { type: "null" },
                                                status: { type: "string" },
                                                inactiveDate: { type: "null" },
                                                location: { type: "string"},
                                                point: { type: "null"},
                                                gender: { type: "string" },
                                                birth: { type: "string", format: "date" }
                                            }
                                        }
                                    }
                                },
                                pagination: {
                                    type: "object",
                                    properties: {
                                        cursor: { type: "integer" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    #swagger.responses[400] = {
        description: "리뷰 조회 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "U008" },
                                reason: { type: "string", example: "등록한 리뷰가 없습니다." },
                            }
                        },
                        success: { type: "null", example: null }
                    }
                }
            }
        }
    }

    */

}