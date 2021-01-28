import React from 'react';
import PropTypes from 'prop-types';
import st from './Service.module.scss';

import Button from './Button';
import ServiceForm from '../ServiceForm';
import classNames from 'classnames';
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
        const { title, time, price, editService, id } = this.props;
        const { isEdit } = this.state;
        const { isEditable } = this.props;
        return (
            <>
                {isEdit ? <ServiceForm editToggle={this.editToggle} id={id} editService={editService} isEdit={isEdit} handler={this.handler} /> :
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

Service.propTypes = {
    // title: PropTypes.string.isRequired,
    // time: PropTypes.number.isRequired,
    // price: PropTypes.number.isRequired,
    // id: PropTypes.number.isRequired
}
export default Service;
