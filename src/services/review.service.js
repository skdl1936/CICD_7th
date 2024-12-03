// 리뷰
import {addReview, getAllMemberReviews, getAllStoreReviews, getReview} from "../repositories/review.repository.js";
import {responseFromAddReview, responseFromReview} from "../dtos/review.dto.js";
import {DuplicateMemberReviewsError, DuplicateStoreError} from "../errors.js";

// 가게에 리뷰 추가
export const userReview = async (data)=>{
    const joinUserReview = await addReview({
        member_id: parseInt(data.member_id),
        store_id: parseInt(data.store_id),
        score: data.score,
        context: data.context,
    });

    if(joinUserReview === null){
        throw new DuplicateStoreError("존재하지 않는 가게입니다.", data);
    }

    const review = await getReview(joinUserReview);
    return responseFromAddReview(review);
}

// 가게 리뷰목록 불러오기
export const listStoreReviews = async(storeId,cursor) =>{
    const reviews = await getAllStoreReviews(storeId,cursor);
    return responseFromReview(reviews);
}

//내가 작성한 리뷰 목록 출력
export const listMemberReviews = async(memberId, cursor) =>{
    const reviews = await getAllMemberReviews(memberId, cursor);

    if(reviews === null){
        throw new DuplicateMemberReviewsError("등록한 리뷰가 없습니다.");
    }

    return responseFromReview(reviews);
}