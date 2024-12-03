import {prisma} from "../db.config.js";

export const dbAddMemberMission = async(data) =>{
    
    //이미 도전중인지 검사
    const confirm = await prisma.MyMission.count({
        where: {
            missionId: data.mission_id,
            memberId: data.member_id,
            status: "in_progress", // 진행중
        }
    })

    if(confirm){
        return null;
    }

    const result = await prisma.MyMission.create({
        data:{
            missionId : data.mission_id,
            memberId: data.member_id,
            status: "in_progress",
        }
    });

    return result.id;
}

// 유저에게 추가한 미션을 출력
export const getMemberMission = async (myMission_id) =>{
    const newMission = await prisma.MyMission.findFirst({
        select:{
            id: true,
            status: true,
            createAt: true,
            mission: {
                select:{
                    detail: true,
                    mpoint:true,
                },
            },
        },
        where:{id:myMission_id}
    })
    return newMission;
}

//완료로 바꾸기
export const changeComplete = async (memberId, missionId) =>{
    const myMission = await prisma.myMission.findFirst({
        select:{
            id:true
        },
        where:{
            status: "in_progress",
            memberId : memberId,
            missionId : missionId,
        }
    });

    if(myMission === null){
        return null;
    }

    const changeRecode = await prisma.MyMission.update({
        where:{
            id: myMission.id,
        },
        data:{
            status: "complete",
            updateAt: new Date()
        },
    });
    
    return changeRecode; // 변경된 레코드의 데이터를 받음
}

// 완료된 모든 미션 가져오기
export const getMemberCompleteMissionList = async(memberId, missionId, cursor) =>{

    const completeMissions = await prisma.myMission.findMany({
        where: {
            memberId: memberId,      // 요청한 memberId로 필터링
            status: "complete",     // 완료된 미션만 가져오기
        },
        select: {
            status: "complete",
            mission: {
                select: {
                    mpoint: true,
                    detail: true,
                },
            },
        },
    });

    return completeMissions;
}

