import React from 'react';
import PropTypes from 'prop-types';
import st from './Button.module.scss';
import classNames from 'classnames';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = { props }
    }

    render() {
        const { type, label } = this.props;
        return (
            <button className={classNames(`${st.btn}`, { [`btn__${type}`]: true })}>{label}</button>
        )
    }
}

export default Button;
