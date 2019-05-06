export default (user=null, action) => {
    if (action.type === "LOGIN"){
        return action.payload;
    }
    return user;
}