// 미션을 추가하고 추가한 미션을 출력해주는 메서드
import {
    getStoreMission,
    setNewMission,
    getStoreMissionList
} from "../repositories/storeMission.repository.js";
import {responseFromStoreMission, responseFromStoreMissionList} from "../dtos/storeMission.dto.js";
import {
    DuplicateStoreError,
    DuplicateStoreMissionError,
} from "../errors.js";

// 미션을 생성한 후 해당 가게에 미션 추가
export const storeMission = async (data)=>{
    const missionId = await setNewMission(data);

    if(missionId === null){
        throw new DuplicateStoreError("존재하지 않는 가게 입니다.",data);
    }


    // 추가한 미션을 반환해준다.
    const select_Mission = await getStoreMission(missionId);
    return responseFromStoreMission(select_Mission);
}

export const listStoreMission = async(storeId, cursor) =>{

    const missionList = await getStoreMissionList(storeId, cursor);

    if(missionList === null){
        throw new DuplicateStoreMissionError("등록된 미션이 없습니다.")
    }

    return responseFromStoreMissionList(missionList);
}











// 가게에 등록된 모든 미션을 가져옴
// export const allStoreMission = async() =>{
//     const missions = await getAllStoreMission();
//
//     if(missions === null){
//         throw new Error("미션이 없습니다.");
//     }
//     return missions;
// }
