import { prisma } from "../db.config.js";

// 사용자 추가하기
export const addUser = async (data) =>{
    const member = await prisma.member.findFirst({where: {email: data.email}});

    if(member){
        return null;
    }

    const created = await prisma.member.create({data:data});
    return created.id;
};

// 사용자정보 얻기
export const getUser = async (memberId) =>{
    const member = await prisma.member.findFirstOrThrow({where: {id: memberId}});
    return member;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (memberId, foodCategoryId) =>{
    await prisma.favoriteFood.create({
        data: {
            memberId: memberId,
            foodCateId: foodCategoryId,
        },
    });
};

export const deletePreference = async (memberId) =>{

    //deleteMany를 사용하여 특정 memberId에 해당하는 모든 레코드 삭제가능
    await prisma.favoriteFood.deleteMany({
        where: {memberId: memberId},
    })
}

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (memberId)=>{
    const preferences = await prisma.favoriteFood.findMany({
        select:{
            id: true,
            memberId: true,
            foodCateId: true,
            foodCategory: true
        },
        where: {memberId: memberId},
        orderBy:{foodCateId: "asc"},
    })

    return preferences;
};

// 사용자 정보 수정
export const memberModify = async (data) =>{
    const member = await prisma.member.findFirst({where: {email: data.email}});

    if(member){
        return 'M001';
    }

    const result = await prisma.member.update({
        where:{
            id: data.memberId
        },
        data:{
            name: data.name,
            uId: data.uId,
            pwd: data.pwd,
            email: data.email,
            gender: data.gender,
            birth: data.birth,
            location: data.location || "",
        }
    })

    if(result === null)
        return "M002";

    return result.id;
}