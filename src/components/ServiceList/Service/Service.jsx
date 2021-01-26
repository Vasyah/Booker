import React from 'react';
import PropTypes from 'prop-types';
import st from './Service.module.scss';

import Button from './Button';

class Service extends React.Component {

    render() {
        const { title, time, price } = this.props;
        const { isEdit } = this.props;
        return (
            <>
                <div className={st.grid} >
                    {isEdit ? "HELLO" : "BYE"}
                    <div className="">{title}</div>
                    <div className="">{time}</div>
                    <div className="">{price}</div>
                    {isEdit ? "" : <Button type="edit" label="edit" />}
                </div>
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
