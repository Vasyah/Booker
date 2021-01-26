import React from 'react';
import MyInput from '../../MyInput';
import PropTypes from 'prop-types';
import st from './ServiceForm.module.scss';
import Formsy, { addValidationRule } from 'formsy-react'

import { useState } from 'react';

const errors = {
    isEmail: 'You have to type a valid email',
    maxLength: 'You cannot type more than 25 characters',
    minLength: 'You must type more than 6 characters',
    isAlpha: 'You can only type letters',
    equalsField: 'Password is not match',
    isStrong: 'Your password is not strong',
    isNumeric: "Чувак, введи число"
}

class ServiceForm extends React.Component {

    state = {
        title: '',
        time: '',
        price: '',
        canSubmit: false
    };
    handleChange = (e) => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    addService = () => {
        const data = this.state;
        const { addService } = this.props;
        this.setState({
            title: '',
            time: '',
            price: ''
        });
        addService(data);
    }

    disableButton = () => {
        console.log("DISABLED");
        this.setState({ canSubmit: false })
    }
    enableButton = () => {
        console.log("ENABLED");
        this.setState({ canSubmit: true })
    }
    onSubmit = (model) => {
        const { addService } = this.props;
        addService(model);
        console.log("form posted", model)
    }
    render() {
        return (
            <>
                <Formsy className='form' onValidSubmit={this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className={st.grid}>
                    <MyInput label="Название услуги" type="text" name="title" validations="isWords" validationErrors={errors} placeholder="Введите название..." required />
                    <MyInput label="Длительность" type="text" name="time" validations="isNumeric" validationErrors={errors} placeholder="Введите название..." required />
                    <MyInput label="Стоимость" type="text" name="price" validations="isNumeric" validationErrors={errors} placeholder="Введите название..." required />
                    <button type="submit" className={st.btn} disabled={!this.state.canSubmit}>
                        Добавить
                    </button>
                </Formsy>

            </>
        )
    }
}

// ServiceForm.propTypes = {
//     title: PropTypes.string.isRequired,
//     time: PropTypes.number.isRequired,
//     price: PropTypes.number.isRequired,
// }
// ServiceForm.propTypes = {
//     title: PropTypes.string.isRequired,
//     completed: PropTypes.bool.isRequired,
//     toggleCompleted: PropTypes.func.isRequired,
//     // id: PropTypes.number.isRequired
// }
export default ServiceForm;
