import {
    POST_DEFAULTWORKDAYS_SUCCESS,
    POST_DEFAULTWORKDAYS_STARTED,
    POST_DEFAULTWORKDAYS_FAILURE
} from '../types';

import axiosConfig from '../../../../api/index';


export const postDefaultWorkdays = (days) => {
    return dispatch => {
        dispatch(postDefaultWorkdaysStarted());

        axiosConfig
            .post(`/workdays/defaults`, days)
            .then(res => {
                console.log(res.data);
                setTimeout(() => dispatch(postDefaultWorkdaysSuccess(res.data.data)), 500);

            })
            .catch(err => {
                dispatch(postDefaultWorkdaysFailure(err.message));
            });
    };
};

const postDefaultWorkdaysSuccess = workdays => ({
    type: POST_DEFAULTWORKDAYS_SUCCESS,
    payload: [
        ...workdays
    ]
});

const postDefaultWorkdaysStarted = () => ({
    type: POST_DEFAULTWORKDAYS_STARTED
});

const postDefaultWorkdaysFailure = error => ({
    type: POST_DEFAULTWORKDAYS_FAILURE,
    payload: {
        error
    }
});