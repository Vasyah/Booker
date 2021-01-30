import React from 'react';
import PropTypes from 'prop-types';
import st from './Service.module.scss';

import Button from './Button';
import classNames from 'classnames';

import { connect } from "react-redux";
import { deleteService } from "./../../store/actions/deleteService";
import ServiceForm_W from "./../ServiceForm/ServiceForm";
class Service extends React.Component {
    state = { isEdit: false };
    editToggle = (e) => {
        const { isEdit } = this.state;
        this.setState({ isEdit: !isEdit });
    }
    deleteService = () => {
        const { id, deleteService } = this.props;
        deleteService(id);
    }

    render() {
        const { title, time, price, id, isEditable } = this.props;
        const { isEdit } = this.state;
        return (
            <>
                {isEdit ? <ServiceForm_W editToggle={this.editToggle} id={id} isEdit={isEdit} handler={this.handler} /> :
                    <div className={classNames(`${st.flex}`, `${st.flexAC}`)}>
                        <div className={st.grid} >
                            <div className="">{title}</div>
                            <div className="">{time}</div>
                            <div className="">{price}</div>
                            <span className={classNames(`${st.flex} ${st.abs}`)}>
                                {/* для отображения с  полями редактирования/удаления */}
                                {isEditable && <button data-type="edit" onClick={this.editToggle} className={classNames(`${st.btn}`, `${st.btn__edit}`)}>🔧</button>}
                                {isEditable && <button data-type="delete" onClick={this.deleteService} className={classNames(`${st.btn}`, `${st.btn__delete}`)}>❌</button>}
                            </span>
                        </div>
                    </div>

                }
            </>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteService: (id) => {
            dispatch(deleteService(id));
        }
    }
}
const Service_w = connect(null, mapDispatchToProps)(Service);
export default Service_w;

