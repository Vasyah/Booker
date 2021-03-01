import {
    POST_SPECIALWORKDAYS_SUCCESS,
    POST_SPECIALWORKDAYS_STARTED,
    POST_SPECIALWORKDAYS_FAILURE
} from '../types';

import axiosConfig from '../../../../api/index';


export const postSpecialWorkdays = (specialDay) => {
    return dispatch => {
        dispatch(postSpecialWorkdaysStarted());
        axiosConfig
            .post(`/specialdays`, { "dayInfo": specialDay })
            .then(res => {
                console.log(res.data.data);
                setTimeout(() => dispatch(postSpecialWorkdaysSuccess(res.data.data)), 500);
            })
            .catch(err => {
                dispatch(postSpecialWorkdaysFailure(err.message));
            });
    };
};

const postSpecialWorkdaysSuccess = specialDay => ({
    type: POST_SPECIALWORKDAYS_SUCCESS,
    payload: specialDay
});

const postSpecialWorkdaysStarted = () => ({
    type: POST_SPECIALWORKDAYS_STARTED
});

const postSpecialWorkdaysFailure = error => ({
    type: POST_SPECIALWORKDAYS_FAILURE,
    payload: {
        error
    }
});