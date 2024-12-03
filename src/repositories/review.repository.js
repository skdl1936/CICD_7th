import {prisma} from "../db.config.js";

// 가게에 리뷰 추가
export const addReview = async (data)=>{
    const confrim = await prisma.store.findFirst({
        where: {id: data.store_id}
    })

    if( confrim === null ){
        return null;
    }

    const result = await prisma.Review.create({
        data:{
            storeId:data.store_id,
            memberId:data.member_id,
            score: data.score,
            context:data.context
        }
    })
    return result.id;
}

export const getReview = async (reviewId)=>{
    const review = await prisma.Review.findFirst({where:{id:reviewId}});
    return review;
}


// 해당 가게의 모든 리뷰 불러오기
export const getAllStoreReviews = async(storeId, cursor)=>{
    
    const reviews = await prisma.Review.findMany({
        select :{
            id: true,
            storeId: true,
            memberId: true,
            score: true,
            context: true,
            store: true,
            member: {
                select:{
                    name: true,
                    email: true
                }
            },
        },
        where: { storeId: storeId, id : {gt: cursor}},
        orderBy:{id:"asc"},
        take: 5,
    });

    return reviews;
}

//내가 작성한 리뷰 목록
export const getAllMemberReviews = async(memberId, cursor)=>{
    const confrim = await prisma.Review.findFirst({where:{id:memberId}});

    if(confrim === null){
        return null;
    }

    const reviews = await prisma.Review.findMany({
        select:{
            id: true,
            storeId: true,
            memberId: true,
            score: true,
            context: true,
            member: true
        },
        where : {memberId: memberId, id: {gt: cursor}},
        orderBy:{id:"asc"},
        take: 5,
    });

    return reviews;
}