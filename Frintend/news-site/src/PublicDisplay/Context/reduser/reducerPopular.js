import {Popular_REQUEST, Popular_SUCCESS, Popular_FAIL} from "../constans/canstants";

export const PopularListReducer = (state = {videos: []}, action) => {
    switch (action.type) {
        case Popular_REQUEST:
            return {loading: true, NewsPopular: []};
        case Popular_SUCCESS:
            return {loading: false, NewsPopular: action.payload};
        case Popular_FAIL:
            return {loading: false, NewsPopular: action.payload};
        default:
            return state;
    }
};