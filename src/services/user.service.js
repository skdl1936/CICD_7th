import { responseFromUser } from "../dtos/user.dto.js";
import {DuplicateMemberError, DuplicateUserEmailError} from "../errors.js";
import {
    addUser, deletePreference,
    getUser,
    getUserPreferencesByUserId, memberModify,
    setPreference
} from "../repositories/user.repository.js"


// 회원가입
export const userSignUp = async (data)=>{
    const joinUserId = await addUser({
        name: data.name,
        uId: data.uId,
        pwd: data.pwd,
        email: data.email,
        gender: data.gender,
        birth: data.birth,
        location: data.location,
    });

    if(joinUserId === null){
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.",data);
    }

    for(const preference of data.preferences){
        await setPreference(joinUserId, preference);
    }

    const member = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);
    return responseFromUser({member, preferences});
};

export const memberUpdate = async (data)=>{

    const joinMemberId = await memberModify(data);

    if(joinMemberId === "M001"){
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.",data);
    }

    if(joinMemberId === 'M002')
        throw new DuplicateMemberError("존재하지 않는 사용자입니다.",data.memberId);

    // 선호 음식 추가하기전 전부 삭제
    await deletePreference(joinMemberId);

    //선호 음식 추가
    for(const preference of data.preferences){
        await setPreference(joinMemberId, preference);
    }

    const member = await getUser(joinMemberId);
    const preferences = await getUserPreferencesByUserId(joinMemberId);

    return responseFromUser({member, preferences});
}




