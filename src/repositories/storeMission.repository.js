import {prisma} from "../db.config.js";


//새로운 미션을 mission테이블에 추가
export const setNewMission = async(data)=>{

    const store = await prisma.store.findFirst({
        select:{
            name:true
        },
        where:{
            id:data.store_id
        }
    })

    if(store === null){
        return null;
    }

    const result = await prisma.Mission.create({
        data:{
            storeId: data.store_id,
            detail: data.detail,
            mpoint: data.mpoint,
            storeName: store.name
        }
    })

    return result.id;

}

// store와 mission의 매핑테이블인 store_mission에도 추가
// export const setAddStoreMission = async(store_id,mission_id) =>{
//     const confirm = await prisma.Store.count({
//         where:{
//             id: store_id
//         }
//     })
//
//     if(confirm === 0){
//         return null;
//     }
//
//     const Store = await prisma.Store.findFirst({where:{id:store_id}});
//
//
//     const result = await prisma.StoreMission.create({
//         data:{
//             storeId: store_id,
//             missionId: mission_id,
//             storeName: Store.name,
//         }
//     })
//
//     return mission_id;
// }


// 추가해준 mission을 출력해준다.
export const getStoreMission = async(missionId) =>{
    const mission = await prisma.Mission.findFirst({
        select:{
          detail: true,
          mpoint: true,
          createAt: true,
        },
        where:{id:missionId}
    });

    return mission;
}

// 특정 가게의 미션 목록 출력
export const getStoreMissionList = async(storeId, cursor)=>{
    const confirm = await prisma.Mission.findFirst({
        where:{
            storeId: storeId,
        }
    })

    if(confirm === null){
        return null;
    }


    const missions = await prisma.Mission.findMany({
        select:{
            id:true,
            detail: true,
            mpoint:true
        },
        where:{
            storeId: storeId,
            id: {gt: cursor}
        },
        orderBy:{ id:'asc' },
        take:5,
    });

    return missions;
}




