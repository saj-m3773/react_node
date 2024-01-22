import {Category_REQUEST, LastPost_REQUEST, LastPost_SUCCESS} from "../constans/canstants";


export const LastPostReducer = (state = { videos: [] }, action) => {
    switch (action.type) {
        case LastPost_REQUEST:
            return { loading: true, LastPost: [] };
        case LastPost_SUCCESS:
            return { loading: false, LastPost: action.payload };
        case LastPost_FAIL:
            return { loading: false, LastPost: action.payload };
        default:
            return state;
    }
};