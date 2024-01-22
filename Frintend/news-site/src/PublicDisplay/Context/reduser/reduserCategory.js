import {Category_REQUEST, Category_SUCCESS, Category_FAIL} from "../constans/canstants";

export const CategoryListReducer = (state = { videos: [] }, action) => {
    switch (action.type) {
        case Category_REQUEST:
            return { loading: true, CategoryPost: [] };
        case Category_SUCCESS:
            return { loading: false, CategoryPost: action.payload };
        case Category_FAIL:
            return { loading: false, CategoryPost: action.payload };
        default:
            return state;
    }
};