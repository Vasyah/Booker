import React from 'react';
import PropTypes from 'prop-types';
import st from './Button.module.scss';
import classNames from 'classnames';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = { props }
    }

    handleClick = (event) => {
        const { btnType } = this.props; 
        switch (btnType){
            case 'edit':
                break;
            case 'delete':
                break;
            default:
                break;
        }
    }
        render() {
            const { type, label } = this.props;
            const { handleClick } = this.props;
            return (
                <button onClick={handleClick} className={classNames(`${st.btn}`, { [`btn__${type}`]: true })}>{label}</button>
            )
        }
    }

    export default Button;
