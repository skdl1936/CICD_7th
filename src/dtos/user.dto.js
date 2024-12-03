export const bodyToUser = (body) =>{
    const birth = new Date(body.birth);

    return {
        name: body.name,
        uId: body.u_id,
        pwd: body.pwd,
        email: body.email,
        gender: body.gender,
        birth: birth,
        location: body.location || "",
        preferences: body.preferences,
    };
};

export const bodyToMemberUpdate = (memberId,body)=>{
    const birth = new Date(body.birth);

    return {
        memberId: parseInt(memberId),
        name: body.name,
        uId: body.u_id,
        pwd: body.pwd,
        email: body.email,
        gender: body.gender,
        birth: birth,
        location: body.location || "",
        preferences: body.preferences,
    };
}

export const responseFromUser = ({member, preferences}) =>{ // member와 preferences 넘어오게 된다.
    const preferFoods = preferences.map(
        (preference) => preference.foodCategory.category
    );

    return {
        "name": member.name,
        "u_id": member.u_id,
        "pwd": member.pwd,
        "email": member.email,
        "gender": member.gender,
        "birth": member.birth,
        "location": member.location,
        "preferCategory" : preferFoods,
    };
};




