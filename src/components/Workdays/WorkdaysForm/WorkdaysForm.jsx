import React from 'react';
import MyInput from '../../MyInput';
import PropTypes from 'prop-types';
import st from './WorkdaysForm.module.scss';
import Formsy, { addValidationRule } from 'formsy-react'
import classNames from 'classnames';
import { useState } from 'react';

const errors = {
    isEmail: 'You have to type a valid email',
    maxLength: 'You cannot type more than 25 characters',
    minLength: 'You must type more than 6 characters',
    isAlpha: 'You can only type letters',
    equalsField: 'Password is not match',
    isStrong: 'Your password is not strong',
    isNumeric: "Целое число от 0-24"
}

class WorkdaysForm extends React.Component {

    state = {
        monday: { start: null, end: null },
        tuesday: { start: null, end: null },
        wednesday: { start: null, end: null },
        thursday: { start: null, end: null },
        friday: { start: null, end: null },
        saturday: { start: null, end: null },
        sunday: { start: null, end: null },
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
    onSubmitEdit = (model) => {
        const { editService } = this.props;
        model.id = this.props.id;
        const { editToggle } = this.props;
        editToggle();
        this.setState({ isEdit: false });
        editService(model)
        console.log("form posted", model)
    }
    onSubmit = (model) => {
        // const { addService } = this.props;
        console.table(model);
        // console.table();

        // addService(model);
        // console.log("form posted", model)
    }

    handler = (e) => {
        switch (e.target.dataset.type) {
            case "edit":
                this.setState({ isEdit: true });
                break;
            case "delete":
                // DELETE
                break;
            case "cancel":
                const { editToggle } = this.props;
                editToggle();
                this.setState({ isEdit: false });
                break;
            case "confirm":
                this.setState({ isEdit: false });
                break;
            default:
                break;
        }
    }

    mapInputs = (inputs) => {
        const arr = [Object.entries(inputs)].sort((a, b) => a - b);
        const workDays = [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday'
        ];
        const newArr = workDays.map((w) => {
            const obj = { title: w, st: null, end: null};
            arr[0].forEach(a => {
                if(a[0] === `${w}-st`) {
                    obj.st = a[1];
                    return;
                }
                else if(a[0] === `${w}-end`){
                    obj.end= a[1];
                    return;
                }
            })
            return obj;
        })
        return ({
            ...newArr
        })
    }
    render() {
        const { isEdit } = this.props;
        const workDays = [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday'
        ];

        return (
            <>
                <Formsy className='form' mapping={this.mapInputs} onValidSubmit={isEdit ? this.onSubmitEdit : this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} className={st.grid}>
                    {workDays.map((w, i) => {
                        return (
                            <div key={i}>
                                <p className={classNames(`${st.title}`)}>{w}</p>
                                <div className={classNames(`${st.flex}`, `${st.field}`)}>
                                    <MyInput label="C" type="text" name={`${w}-st`} validations="isNumeric" validationErrors={errors} placeholder="" required />
                                    <MyInput label="До" type="text" name={`${w}-end`} validations="isNumeric" validationErrors={errors} placeholder="" required />
                                </div>
                            </div>
                        )

                    })}
                    {isEdit ?
                        <div className={st.flex}>
                            <button type="submit" data-type="confirm" className={st.btn} disabled={!this.state.canSubmit}>
                                ✔
                            </button>
                            <button onClick={this.handler} data-type="cancel" className={st.btn}>❌</button>
                        </div>
                        :
                        <button data-type="cancel" type="submit" className={st.btn} disabled={!this.state.canSubmit}>Добавить </button>
                    }
                </Formsy>
            </>
        )
    }
}
// onClick={this.props.handler}
// WorkdaysForm.propTypes = {
//     title: PropTypes.string.isRequired,
//     time: PropTypes.number.isRequired,
//     price: PropTypes.number.isRequired,
// }
// WorkdaysForm.propTypes = {
//     title: PropTypes.string.isRequired,
//     completed: PropTypes.bool.isRequired,
//     toggleCompleted: PropTypes.func.isRequired,
//     // id: PropTypes.number.isRequired
// }
export default WorkdaysForm;
