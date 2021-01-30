import {
    EDIT_SERVICE_SUCCESS,
    EDIT_SERVICE_FAILURE,
    EDIT_SERVICE_STARTED,
} from '../actions/types';

import axiosConfig from '../../../api/index';
import store from "./../store";


export const editService = service => {
    return dispatch => {
        dispatch(editServiceStarted());

        axiosConfig
            .patch(`/services/${service.id}`, service)
            .then(res => {
                const serviceData = res.data.data;
                const {services} =  store.getState().serviceReducers;

                const { id } = serviceData;
                const newServices = services.map((s) => {
                    if (s.id === id) return s = serviceData;
                    return s;
                });
                dispatch(editServiceSuccess(newServices))
            })
            .catch(err => {
                debugger;
                dispatch(editServiceFailure(err.message));
            });
    };
};

const editServiceSuccess = services => {

    return ({
        type: EDIT_SERVICE_SUCCESS,
        payload: [...services]
    });
}

const editServiceStarted = () => ({
    type: EDIT_SERVICE_STARTED
});

const editServiceFailure = error => ({
    type: EDIT_SERVICE_FAILURE,
    payload: {
        error
    }
});