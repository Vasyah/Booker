import React, { useEffect, useState } from 'react'
import { isSameDay, format, isDate, getISODay, formatISO } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Calendar, useDateInput } from 'react-nice-dates'
// import 'react-nice-dates/build/style.css'
import './CalendarAdmin.scss'

const CalendarAdmin = (props) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const modifiers = {
        highlight: date => getISODay(date) === 1,
        selected: date => isSameDay(date, selectedDate)
    }
    useEffect(() => selectedDate === null ? setIsSelected(false) : setIsSelected(true));
    const handleDayClick = date => {
        // console.log(getISODay(date));
        // console.log(formatISO(date));
        // console.table(date);
        // setIsSelected(true);
        if (isSameDay(selectedDate, date)) {
            setSelectedDate(null);
        }
        else {
            setSelectedDate(date);
        }
        const select = selectedDate;
        console.log(select);

        // debugger;
    }
    return (
        <>
            <Calendar minimumDate={new Date()} onDayClick={handleDayClick} modifiers={modifiers} locale={enGB} />
            {isSelected ? <span>ИНФОРМАЦИЯ О ВЫБРАНОМ ДНЕ</span> : 'KISEL'}
        </>
    )
}

export default CalendarAdmin;

// format(selectedDates[0], 'dd')

// const mapStateToProps = state => {
//     dayInfo: state.WorkdaysReducer.dayInfo
// }

// const mapDispatchToProps = dispatch => {
//     getDayInfo: day => dispatch(getDayInfo(day))
// }