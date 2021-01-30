import {
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAILURE,
    DELETE_SERVICE_STARTED,
} from '../types';

import axiosConfig from '../../../../api/index';
import store from "../../store";

export const deleteService = (id) => {
    return dispatch => {
        dispatch(deleteServiceStarted());
        axiosConfig
            .delete(`/services/${id}`)
            .then(res => {
                const { services } = store.getState().serviceReducers;
                let newServices = services.filter((s) => {
                    return s.id !== id;
                });
                // debugger;
                if (!newServices.length) newServices = [];
                setTimeout(() => dispatch(deleteServiceSuccess(newServices)), 100);
            })
            .catch(err => {
                dispatch(deleteServiceFailure(err.message));
            });
    };
};

const deleteServiceSuccess = services => ({
    type: DELETE_SERVICE_SUCCESS,
    payload: [...services]
});

const deleteServiceStarted = () => ({
    type: DELETE_SERVICE_STARTED
});

const deleteServiceFailure = error => ({
    type: DELETE_SERVICE_FAILURE,
    payload: {
        error
    }
});