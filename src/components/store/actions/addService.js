import {
    ADD_SERVICE_SUCCESS,
    ADD_SERVICE_FAILURE,
    ADD_SERVICE_STARTED,
} from '../actions/types';

import axiosConfig from '../../../api/index';



export const addService = ({ id, title, time, price }) => {
    return dispatch => {
        dispatch(addServiceStarted());

        axiosConfig
            .post(`/services`, {
                id,
                title,
                time,
                price,
            })
            .then(res => {
                setTimeout(() => dispatch(addServiceSuccess(res.data.data)), 100);
            })
            .catch(err => {
                dispatch(addServiceFailure(err.message));
            });
    };
};

const addServiceSuccess = Service => ({
    type: ADD_SERVICE_SUCCESS,
    payload: {
        ...Service
    }
});

const addServiceStarted = () => ({
    type: ADD_SERVICE_STARTED
});

const addServiceFailure = error => ({
    type: ADD_SERVICE_FAILURE,
    payload: {
        error
    }
});