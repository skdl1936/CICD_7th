export const bodyToReview = (body,params) =>{
    return {
        member_id: params.memberId,
        store_id: params.storeId,
        score: body.score,
        context : body.context,
    };
};

export const responseFromAddReview = (data)=>{
    return {
        id : data.id,
        storeId: data.storeId,
        memberId: data.memberId,
        score: data.score,
        context: data.context,
        createAt: data.createAt
    };
};

export const responseFromReview = (reviews)=>{
    return {
        data: reviews,
        pagination:{
            cursor: reviews.length? reviews[reviews.length-1].id : null,
        },
    };
};
