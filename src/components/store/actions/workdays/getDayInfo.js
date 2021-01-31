import {
    GET_DAYINFO_FAILURE,
    GET_DAYINFO_SUCCESS,
    GET_DAYINFO_STARTED
} from '../types';

import axiosConfig from '../../../../api/index';


export const getDayInfo = (dayInfo) => {
    return dispatch => {
        dispatch(getDayInfoStarted());
        if (dayInfo.dayNum === "null") {
            dispatch(getDayInfoSuccess({ dayNum: null }))
            return;
        };
        axiosConfig
            .post(`/workdays/`, dayInfo)
            .then(res => {
                const { dateVisual, date } = dayInfo;
                const data = res.data.data;
                data["dateVisual"] = dateVisual;
                data["date"] = date;
                setTimeout(() => dispatch(getDayInfoSuccess(data)), 500);

            })
            .catch(err => {
                dispatch(getDayInfoFailure(err.message));
            });
    };
};

const getDayInfoSuccess = day => ({
    type: GET_DAYINFO_SUCCESS,
    payload: day

});

const getDayInfoStarted = () => ({
    type: GET_DAYINFO_STARTED
});

const getDayInfoFailure = error => ({
    type: GET_DAYINFO_FAILURE,
    payload: {
        error
    }
});