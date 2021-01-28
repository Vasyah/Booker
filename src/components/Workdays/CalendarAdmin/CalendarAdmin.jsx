import React, { useState } from 'react'
import { isSameDay, format, isDate } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Calendar, useDateInput } from 'react-nice-dates'
// import 'react-nice-dates/build/style.css'
import './CalendarAdmin.scss'

const CalendarAdmin = () => {
    const [selectedDates, setSelectedDates] = useState([])
    const modifiers = {
        selected: date => selectedDates.some(selectedDate => isSameDay(selectedDate, date))
    }
    const timeInputProps = useDateInput({
        date,
        format: 'HH:mm',
        locale: enGB,
        onDateChange: setDate
    })
    const handleDayClick = date => {
        console.log(isDate(selectedDates[0]))
        console.log(selectedDates[0]);
        setSelectedDates([date])
    }
    return (
        <Calendar minimumDate={new Date()} onDayClick={handleDayClick} modifiers={modifiers} locale={enGB} />
    )
}

export default CalendarAdmin;

// format(selectedDates[0], 'dd')