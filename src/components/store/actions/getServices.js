import {
    GET_SERVICES_SUCCESS,
    GET_SERVICES_FAILURE,
    GET_SERVICES_STARTED,
} from '../actions/types';

import axiosConfig from '../../../api/index';

export const getServices = () => {
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