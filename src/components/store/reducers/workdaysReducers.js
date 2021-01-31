import {
  GET_DAYINFO_STARTED,
  GET_DAYINFO_SUCCESS,
  GET_DAYINFO_FAILURE,
  POST_DEFAULTWORKDAYS_STARTED,
  POST_DEFAULTWORKDAYS_SUCCESS,
  POST_DEFAULTWORKDAYS_FAILURE,
  POST_SPECIALWORKDAYS_STARTED,
  POST_SPECIALWORKDAYS_SUCCESS,
  POST_SPECIALWORKDAYS_FAILURE
} from '../actions/types';


const initialState = {
  loading: false,
  selectedDate: [],
  defaultWorkDays: []
}


export default function workdaysReducers(state = initialState, action) {
  switch (action.type) {
    case GET_DAYINFO_STARTED:
      return {
        ...state,
        selectedDate: state.selectedDate,
        loading: true
      };
    case GET_DAYINFO_SUCCESS:

      return {
        ...state,
        loading: false,
        error: null,
        selectedDate: action.payload
      };
    case GET_DAYINFO_FAILURE:
      return {
        ...state,
        selectedDate: state.selectedDate,
        loading: false,
        error: action.payload.error
      };
    // POST Defaults
    case POST_DEFAULTWORKDAYS_STARTED:
      return {
        ...state,
        loading: true
      };
    case POST_DEFAULTWORKDAYS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        defaultWorkDays: [...action.payload]
      };
    case POST_DEFAULTWORKDAYS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    // POST Special
    case POST_SPECIALWORKDAYS_STARTED:
      return {
        ...state,
        loading: true
      };
    case POST_SPECIALWORKDAYS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        selectedDate: action.payload
      };
    case POST_SPECIALWORKDAYS_FAILURE:
      debugger;
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    default:
      return state;
  }
}

