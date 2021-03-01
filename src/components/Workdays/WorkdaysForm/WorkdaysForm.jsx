import React from 'react';
import MyInput from '../../MyInput';
import st from './WorkdaysForm.module.scss';
import Formsy from 'formsy-react'
import classNames from 'classnames';
import { postDefaultWorkdays } from "./../../store/actions/workdays/postDefault";
import { connect } from 'react-redux';

const errors = {
    equalsField: 'Password is not match',
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
        this.setState({ canSubmit: false })
    }
    enableButton = () => {
        this.setState({ canSubmit: true })
    }
    onSubmitEdit = (model) => {
        const { editService } = this.props;
        model.id = this.props.id;
        const { editToggle } = this.props;
        editToggle();
        this.setState({ isEdit: false });
        editService(model)
    }
    onSubmit = (model) => {
        const { postDefaultWorkdays } = this.props;
        postDefaultWorkdays(model);

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
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];
        const newArr = workDays.map((w, i) => {
            const obj = {
                dayNum: i + 1,
                title: w,
                st: null,
                end: null,
            };
            arr[0].forEach(a => {
                if (a[0] === `${w}-st`) {
                    obj.st = a[1];
                    return;
                }
                else if (a[0] === `${w}-end`) {
                    obj.end = a[1];
                    return;
                }
            })
            return obj;
        })
        return (newArr)
    }
    render() {
        const { isEdit } = this.props;
        const workDays = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];

        return (
            <>
                <Formsy className={`${st.grid} form`} mapping={this.mapInputs} onValidSubmit={isEdit ? this.onSubmitEdit : this.onSubmit} onValid={this.enableButton} onInvalid={this.disableButton} >
                    <div className={st.gridInner}>
                    {workDays.map((w, i) => {
                        return (
                            
                            <div key={i}>
                                <p className={classNames(`${st.title}`)}>{w}</p>
                                <div className={classNames(`${st.flex}`, `${st.field}`)}>
                                    <MyInput label="from" type="text" name={`${w}-st`} validations="isNumeric" validationErrors={errors} placeholder="" required />
                                    <MyInput label="to" type="text" name={`${w}-end`} validations="isNumeric" validationErrors={errors} placeholder="" required />
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    {isEdit ?
                        <div className={st.flex}>
                            <button type="submit" data-type="confirm" className={st.btn} disabled={!this.state.canSubmit}>
                                ✔
                            </button>
                            <button onClick={this.handler} data-type="cancel" className={st.btn}>❌</button>
                        </div>
                        :
                        <button data-type="cancel" type="submit" className={st.btn} disabled={!this.state.canSubmit}>Add </button>
                    }
                </Formsy>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postDefaultWorkdays: days => dispatch(postDefaultWorkdays({ dates: [...days] }))
    }
}

const WorkdaysForm_W = connect(null, mapDispatchToProps)(WorkdaysForm);

export default WorkdaysForm_W;
