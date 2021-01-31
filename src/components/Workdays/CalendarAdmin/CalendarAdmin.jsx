import React, { useState } from 'react'
import { isSameDay, getISODay, formatISO9075, parseISO, format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { Calendar } from 'react-nice-dates'
// import 'react-nice-dates/build/style.css'
import './CalendarAdmin.scss'
import MyLoader from "./../../MyLoader/MyLoader";
import { getDayInfo } from "./../../store/actions/workdays/getDayInfo";
import { connect } from 'react-redux'
import style from './CalendarAdmin.module.scss';
import MyInput from '../../MyInput'
import Formsy from "formsy-react";
import { postSpecialWorkdays } from "./../../store/actions/workdays/postSpecial";

const CalendarAdmin = (props) => {
    const [isEdit, setisEdit] = useState(false);
    const [buttonLock, setbuttonLock] = useState(true);
    const [selDate, setSelDate] = useState(null);
    const [isViewing, setisViewing] = useState(false);
    const modifiers = {
        highlight: date => getISODay(date) === 1,
        selected: date => isSameDay(date, selDate)
    }

    const handleDayClick = date => {
        const { getDayInfo } = props;
        if (isSameDay(selDate, date)) {
            getDayInfo({ dayNum: "null" });
            setSelDate(null);
            setisViewing(false);
        }
        else {
            const dateFormatted = formatISO9075(date, { representation: 'date' });
            const dateForm = format(date, "d EEEE y");
            const dayNum = getISODay(parseISO(dateFormatted));
            const dateObj = {
                dayNum,
                date: dateFormatted,
                dateVisual: dateForm
            }
            getDayInfo(dateObj);
            setSelDate(date);
            setisViewing(true);
        }
    }
    const closeBtnHandler = () => {
        setisViewing(false);
        setSelDate(null);
    }
    const errors = {
        isWords: "Не используйте цифры и спец. символы",
        isEmail: 'You have to type a valid email',
        maxLength: 'You cannot type more than 25 characters',
        minLength: 'You must type more than 6 characters',
        isAlpha: 'You can only type letters',
        equalsField: 'Password is not match',
        isStrong: 'Your password is not strong',
        isNumeric: "Введите целое число"
    };

    const onSubmit = (model) => {
        const { postSpecialWorkdays } = props;
        const { date } = props.selectedDate;
        const dateVisual = format(parseISO(date), "d EEEE y");
        const dayNum = getISODay(parseISO(date));
        const title = format(parseISO(date), "EEEE");
        const newModel = { ...model, date, dateVisual, dayNum, title };

        postSpecialWorkdays(newModel);
        setisEdit(false);
    }
    const disableButton = () => {
        setbuttonLock(true);
    }
    const enableButton = () => {
        setbuttonLock(false);
    }
    const { selectedDate, loading } = props;
    const { st, end, title, dateVisual, msg } = selectedDate;
    return (
        <div className={style.container}>
            {loading && <MyLoader />}
            <Calendar minimumDate={new Date()} onDayClick={handleDayClick} modifiers={modifiers} locale={enGB} />
            {isViewing && <div className="row pop-up">
                <div className="box small-6 large-centered">
                    <button className="close-button" onClick={closeBtnHandler}>❌</button>
                    {msg === "not exist" ? <span className={style.emptyMsg}>НИЧЕГО НЕ НАЙДЕНО</span> :
                        <>
                            <h4 className={style.popUpTitle}>Working time</h4>
                            <p>{dateVisual}</p>
                            <p><span>Start: </span><strong>{st}</strong></p>
                            <p><span>End: </span><strong>{end}</strong></p>
                            <p><span>Day is: </span><strong>{title}</strong></p>
                        </>
                    }
                    {isEdit ?
                        <Formsy className='form' onValidSubmit={onSubmit} onValid={enableButton} onInvalid={disableButton} className="grid">
                            <MyInput label="Start" type="text" name="st" validations="isNumeric" validationErrors={errors} placeholder="" required />
                            <MyInput label="End" type="text" name="end" validations="isNumeric" validationErrors={errors} placeholder="" required />
                            <div className="flex">
                                <button type="submit" data-type="confirm" className="btn" disabled={buttonLock}>
                                    ✔
                            </button>
                                <button onClick={() => setisEdit(false)} data-type="cancel" className="btn">❌</button>
                            </div>
                        </Formsy>
                        :
                        <button className="button-workdays" onClick={() => setisEdit(true)}>EDIT</button>
                    }
                </div>
            </div>
            }

        </div>
    )
}

const mapStateToProps = state => {
    const { workdaysReducers } = state
    return {
        selectedDate: workdaysReducers.selectedDate,
        loading: workdaysReducers.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDayInfo: day => dispatch(getDayInfo(day)),
        postSpecialWorkdays: specialDay => dispatch(postSpecialWorkdays(specialDay)),
    }
}

const CalendarAdmin_W = connect(mapStateToProps, mapDispatchToProps)(CalendarAdmin);

export default CalendarAdmin_W;
