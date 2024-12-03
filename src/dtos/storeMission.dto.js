export const paramsToMission = (params,body) =>{
    return {
        store_id: parseInt(params.storeId,10),
        mission_id: parseInt(params.missionId,10),
        detail: body.detail,
        mpoint: body.mpoint
    };
};

export const responseFromStoreMission = (data)=>{
    return {
        detail: data.detail,
        mpoint: data.mpoint,
        createAt: data.createAt
    }
}

export const responseFromStoreMissionList = (missions)=>{
    return {
        data:missions,
        pagination:{
            cursor: missions[0].length? missions[missions.length-1].id : null,
        },
    };
};