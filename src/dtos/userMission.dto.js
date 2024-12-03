export const bodyToUserMissionList = (params)=>{
    return {
        member_id: parseInt(params.memberId),
        mission_id: parseInt(params.missionId),
    }
}


export const responseFromAddUserMission = (myMission)=> {
    return {
        myMissionId: myMission.id,
        status: myMission.status,
        detail: myMission.mission.detail,
        mpoint: myMission.mission.mpoint,
        createAt: myMission.mission.create_at,
    }
}

// 진행 중인 미션을 진행완료로 바꿔준후 반환값
export const responseFromUpdateMission = (newMission)=>{
    return {
        myMissionId: newMission.id,
        missionId: newMission.missionId,
        memberId: newMission.memberId,
        createAt: newMission.createAt,
        updateAt: newMission.updateAt,
        status: newMission.status
    }
}

