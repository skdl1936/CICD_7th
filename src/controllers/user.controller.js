import {StatusCodes} from "http-status-codes";
import {bodyToMemberUpdate, bodyToUser} from "../dtos/user.dto.js";
import {memberUpdate, userSignUp} from "../services/user.service.js";


export const handleUserSignUp = async (req,res, next)=>{
    console.log("회원가입을 요청했습니다!");

    const user = await userSignUp(bodyToUser(req.body));

    res.status(StatusCodes.OK).success(user);
    /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
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
                  name: { type: "string" },
                  u_id: {type : "string"},
                  pwd: {type: "string" },
                  email: { type: "string" },
                  gender: { type: "string" },
                  birth: { type: "string" ,format: "date" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */

}


export const handleMemberUpdate = async (req,res)=>{
    console.log('회원 정보 수정')

    const member = await memberUpdate(bodyToMemberUpdate(req.params.memberId,req.body));

    res.status(StatusCodes.OK).success(member);

    /*
    #swagger.summary = '회원 정보 수정 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              uId: {type: "string" },
              pwd: { type: "string" },
              email: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              location: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 정보 수정 성공 응답",
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
                  name: { type: "string" },
                  u_id: {type : "string"},
                  pwd: {type: "string" },
                  email: { type: "string" },
                  gender: { type: "string" },
                  birth: { type: "string" ,format: "date" },
                  location: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 정보 수정 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M002" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
}



