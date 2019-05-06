import axios from "axios";

export const login = (user) => {
    return {
        type: "LOGIN",
        payload: user
    }
}

export const asyncGetUser = () => {
    return async (dispatch) => {
        let response = await axios.get("/user");
        if (response.status === 200) {
            console.log("GOT USER", response.data);
            dispatch({
                payload: response.data,
                type: "LOGIN"
            })
        }
    }
}