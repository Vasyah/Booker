import {
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_STARTED,
  GET_SERVICES_STARTED,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILURE,
  EDIT_SERVICE_STARTED,
  EDIT_SERVICE_SUCCESS,
  EDIT_SERVICE_FAILURE,
  DELETE_SERVICE_STARTED,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE
} from '../actions/types';


const initialState = {
  loading: false,
  services: [],
  error: null
}


export default function serviceReducers(state = initialState, action) {
  switch (action.type) {
    // ADD
    case ADD_SERVICE_STARTED:
      return {
        services: [...state.services],
        loading: true
      };
    case ADD_SERVICE_SUCCESS:
      return {
        loading: false,
        error: null,
        services: [...state.services, action.payload]
      };
    case ADD_SERVICE_FAILURE:
      return {
        services: [...state.services],
        loading: false,
        error: action.payload.error
      };
    // GET
    case GET_SERVICES_STARTED:
      return {
        ...state,
        loading: true
      };
    case GET_SERVICES_SUCCESS:
      return {
        loading: false,
        error: null,
        services: [...action.payload]
      };
    case GET_SERVICES_FAILURE:
      return {
        services: [...state.services],
        loading: false,
        error: action.payload.error
      };
    // EDIT
    case EDIT_SERVICE_STARTED:
      return {
        ...state,
        loading: true
      };
    case EDIT_SERVICE_SUCCESS:
      return {
        loading: false,
        error: null,
        services: [...action.payload]
      };
    case EDIT_SERVICE_FAILURE:
      return {
        services: [...state.services],
        loading: false,
        error: action.payload.error
      };
    // DELETE
    case DELETE_SERVICE_STARTED:
      return {
        ...state,
        loading: true
      };
    case DELETE_SERVICE_SUCCESS:
      return {
        loading: false,
        error: null,
        services: [...action.payload]
      };
    case DELETE_SERVICE_FAILURE:
      return {
        services: [...state.services],
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

