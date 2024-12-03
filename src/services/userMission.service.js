
import {
    changeComplete,
    dbAddMemberMission,
    getMemberCompleteMissionList,
    getMemberMission
} from "../repositories/userMission.repository.js";
import {
    responseFromAddUserMission, responseFromUpdateMission
} from "../dtos/userMission.dto.js";
import {DuplicateUserMissionError, DuplicateUserMissionInProgressError} from "../errors.js";



//유저한테 미션 추가하기
export const addUserMission = async (data)=>{

    const addMemberMisson = await dbAddMemberMission({
        member_id: data.member_id,
        mission_id: data.mission_id,
    });

    if(addMemberMisson === null){
        throw new DuplicateUserMissionError("이미 도전중인 미션입니다.",data)
    }

    //추가한 mymission을 반환
    const myNewMission = await getMemberMission(addMemberMisson);

    return responseFromAddUserMission(myNewMission);
}

// 진행완료로 바꾼 미션을 가져오는 로직
export const memberCompleteMissionList = async (memberId, missionId) =>{

    const result = await changeComplete(memberId,missionId);

    if(result === null){
        throw new DuplicateUserMissionInProgressError("진행중인 미션이 없습니다.");
    }

    // 모든 미션을 가져오는 로직
    // const memberCompleteList = await getMemberCompleteMissionList(memberId, missionId, cursor);
    return  responseFromUpdateMission(result);
}

