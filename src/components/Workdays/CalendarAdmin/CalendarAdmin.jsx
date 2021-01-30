import React, { useState } from 'react'
import { isSameDay, format, isDate, getISODay } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Calendar, useDateInput } from 'react-nice-dates'
// import 'react-nice-dates/build/style.css'
import './CalendarAdmin.scss'

const CalendarAdmin = (props) => {
    const [selectedDates, setSelectedDates] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const modifiers = {
        highlight: date => getISODay(date) === 0,
        selected: date => isSameDay(selectedDates, date),
        // selectedDates.some(selectedDate => isSameDay(selectedDate, date))
    }
    const handleDayClick = date => {
        console.log(getISODay(date));
        setIsSelected(true);
        setSelectedDates(date)
    }
    return (
        <>
            <Calendar minimumDate={new Date()} onDayClick={handleDayClick} modifiers={modifiers} locale={enGB} />
            { isSelected ? <div> Выбран {selectedDates}</div> : <span>false</span>}
        </>
    )
}

export default CalendarAdmin;

// format(selectedDates[0], 'dd')