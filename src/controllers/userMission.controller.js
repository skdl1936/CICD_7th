// 가게테이블과 미션테이블이 매핑된 store_mission에 있는 미션들중
// 사용자들이 미션에 추가해야하니까
// db에서 store_mission의 목록들을 전부 가져와서 개인이 추가하고 싶은 store_mission의 id를 넘겨서 개인 미션테이블에 추가하는 형식
import {StatusCodes} from "http-status-codes";
import {addUserMission, memberCompleteMissionList} from "../services/userMission.service.js";
import {bodyToUserMissionList} from "../dtos/userMission.dto.js";

export const handleUserMission = async (req, res, next)=>{
    console.log("멤버별 미션을 추가하는 기능입니다.");
    // // 모든 미션을 출력함
    // const selectmission = await allStoreMission(); // 이렇게 하니까 사용자가 무슨 미션을 클릭할지 모름

    const userMission = await addUserMission(bodyToUserMissionList(req.params));

    res.status(StatusCodes.OK).success(userMission);
    /*
    #swagger.summary = "유저 미션 추가 API"
    #swagger.responses[200] = {
        description: "유저 미션 추가 요청 성공 응답",
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
                                myMissionId: { type: "integer" },
                                status: { type: "string" },
                                detail: { type: "string" },
                                mpoint: { type: "integer" }
                            }
                        }
                    }
                }
            }
        }
    }

    #swagger.responses[400] = {
        description: "유저 미션 추가 요청 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "U004" },
                                reason: { type: "string", example: "이미 도전중인 미션입니다." },
                                data: {
                                    type: "object",
                                    properties: {
                                        member_id: { type: "integer" },
                                        mission_id: { type: "integer" }
                                    }
                                }
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

export const handleMemberMissionComplete = async (req,res,next)=>{
    console.log("진행중인 미션을 진행완료로 바꾸기");

    const completeMission = await memberCompleteMissionList(
        parseInt(req.params.memberId),
        parseInt(req.params.missionId),
    );

    res.status(StatusCodes.OK).success(completeMission);

    /*
    #swagger.summary = "미션 진행완료로 바꾸는 API"
    #swagger.responses[200] = {
        description: "미션 진행완료로 바꾸기 요청 성공 응답",
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
                                myMissionId: { type: "integer" },
                                missionId: { type: "integer" },
                                memberId: { type: "integer" },
                                createAt: { type: "string", format: "date" },
                                updateAt: { type: "string", format: "date" },
                                status: { type: "string" }
                            }
                        }
                    }
                }
            }
        }
    }

    #swagger.responses[400] = {
        description: "미션 진행완료로 바꾸기 요청 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string" , example: "U005"},
                                reason: { type: "string" , example: "진행중인 미션이 없습니다."},
                            }
                        },
                        success: { type: "null", example: "null" }
                    }
                }
            }
        }
    }

    */

}