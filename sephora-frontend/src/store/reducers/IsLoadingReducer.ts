import {UnknownAction} from "@reduxjs/toolkit";

export interface IsLoadingState {
    isLoading: boolean;
}

export enum IsLoadingActionTypes {
    SET_LOADING = "SET_LOADING",
}

export interface SetLoadingAction {
    type: IsLoadingActionTypes.SET_LOADING;
    payload: boolean;
}

const initState: IsLoadingState = {
    isLoading: false,
};

export const IsLoadingReducer = (
    state: IsLoadingState = initState,
    action: UnknownAction
): IsLoadingState => {
    switch (action.type) {
        case IsLoadingActionTypes.SET_LOADING:
            return <IsLoadingState>{...state, isLoading: action.payload};
        default:
            return state;
    }
};
