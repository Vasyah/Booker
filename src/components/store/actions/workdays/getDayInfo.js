import {
    GET_DAYINFO_FAILURE,
    GET_DAYINFO_SUCCESS,
    GET_DAYINFO_STARTED
} from '../types';

import axiosConfig from '../../../../api/index';

export const getDayInfo = () => {
    return dispatch => {
        dispatch(getServicesStarted());

        axiosConfig
            .get(`/services`)
            .then(res => {
                setTimeout(() => dispatch(getServicesSuccess(res.data.data)), 1000);

            })
            .catch(err => {
                dispatch(getServicesFailure(err.message));
            });
    };
};

const getServicesSuccess = Services => ({
    type: GET_SERVICES_SUCCESS,
    payload: [
        ...Services
    ]
});

const getServicesStarted = () => ({
    type: GET_SERVICES_STARTED
});

const getServicesFailure = error => ({
    type: GET_SERVICES_FAILURE,
    payload: {
        error
    }
});