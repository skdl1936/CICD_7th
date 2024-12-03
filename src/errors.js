// 유저 이메일이 이미 존재할 때
export class DuplicateUserEmailError extends Error {
    errorCode = 'M001';

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class DuplicateMemberError extends Error{
    errorCode = "M002";

    constructor(reason,memberId) {
        super(reason);
        this.reason = reason;
        this.data = memberId;
    }

}

// 가게가 존재하지 않을 때
export class DuplicateStoreError extends Error {
    errorCode = 'U002';

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 미션이 존재하지 않을 떄
export class DuplicateStoreMissionError extends Error {
    errorCode = 'U003';

    constructor(reason) {
        super(reason);
        this.reason = reason;
    }
}

// 이미 미션 도전중일 때
export class DuplicateUserMissionError extends Error {
    errorCode = 'U004';

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

// 나의 미션에서 진행중인 리뷰가 없을떄
export class DuplicateUserMissionInProgressError extends Error {
    errorCode = 'U005';

    constructor(reason) {
        super(reason);
        this.reason = reason;
    }
}

// 등록된 리뷰가 없을떄
export class DuplicateMemberReviewsError extends Error{
    errorCode = 'U006';

    constructor(reason) {
        super(reason);
        this.reason = reason;
    }
}