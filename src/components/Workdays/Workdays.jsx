import React from 'react';
import PropTypes from 'prop-types';
import st from './Workdays.module.scss';

import { useState } from 'react';
import WorkdaysForm from "./WorkdaysForm";
import Calendar from './Calendar';
import CalendarAdmin_W from './CalendarAdmin';
import WorkdaysForm_W from "./WorkdaysForm/WorkdaysForm";


const Workdays = () => {
    return (
        <>  
            <h3 className="title">Editing working hours</h3>
            <WorkdaysForm_W />
            {/* <Calendar /> */}
            <CalendarAdmin_W />
        </>
    )
}

export default Workdays;
