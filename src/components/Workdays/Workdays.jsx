import React from 'react';
import PropTypes from 'prop-types';
import st from './Workdays.module.scss';

import { useState } from 'react';
import WorkdaysForm from "./WorkdaysForm";
import Calendar from './Calendar';
import CalendarAdmin from './CalendarAdmin';


const Workdays = () => {
    return (
        <>
            <WorkdaysForm />
            {/* <Calendar /> */}
            <CalendarAdmin />
        </>
    )
}

export default Workdays;
