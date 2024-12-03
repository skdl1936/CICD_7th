import {listStoreMission, storeMission} from "../services/storeMission.service.js";
import {paramsToMission} from "../dtos/storeMission.dto.js";
import {StatusCodes} from "http-status-codes";


// 가게에 미션 추가
export const handleStoreMission = async (req,res, next)=>{
    console.log("가게에 미션을 추가하는 기능입니다.");

    const mission = await storeMission(paramsToMission(req.params,req.body));
    res.status(StatusCodes.OK).success(mission);

    /*
    #swagger.summary = "가게 미션 추가 API";
    #swagger.requestBody = {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        detail: { type: "string" },
                        mpoint: { type: "integer" }
                    },
                    required: ["detail", "mpoint"]
                }
            }
        }
    }
   #swagger.responses[200] = {
        description: "가게 리뷰 추가 요청 성공 응답",
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
                                detail: { type: "string" },
                                mpoint: { type: "integer" },
                                createAt: { type: "string", format: "date" }
                            }
                        }
                    }
                }
            }
        }
    }

    #swagger.responses[400] = {
        description: "가게 리뷰 추가 요청 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "U002" },
                                reason: { type: "string" },
                                data: {
                                    type: "object",
                                    properties: {
                                        store_id: { type: "integer" },
                                        mission_id: { type: "integer" }
                                    }
                                },
                                detail: { type: "string" },
                                mpoint: { type: "integer" }
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


// 특정가게의 미션 목록을 출력
export const handleListStoreMission = async (req,res,next)=>{
    console.log("특정 가게의 미션 목록 출력하는 기능");

    const missions = await listStoreMission(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string"? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);

    /*
    #swagger.summary = "특정가게의 미션 목록을 출력 API"
    #swagger.responses[200] = {
        description: "특정가게의 미션 목록을 출력 성공 응답",
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
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "integer" },
                                            detail: { type: "string" },
                                            mpoint: { type: "integer" }
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
        description: "특정가게의 미션 목록을 출력 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string",example: "U003" },
                                reason: { type: "string", example: "등록된 미션이 없습니다." },
                            }
                        },
                        success: { type: "null" , example : null}
                    }
                }
            }
        }
    }


    */
}


