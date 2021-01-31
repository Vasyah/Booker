import React from 'react';
import st from './MyInput.module.scss';

import { withFormsy } from 'formsy-react';
import classNames from 'classnames';
class MyInput extends React.Component {

    handleChange = (e) => {
        this.props.setValue(e.target.value)
    }
    render() {
        const { label, name, type, value, errorMessage, clName } = this.props;
        return (
            <div className="input-row">
                <label className={st.label}>{label}</label>
                <input
                    className={classNames(`${st.input}`, {[`${st.sizeXS}`]: name==="time" || name==="price"}, `${clName}`)}
                    name={name}
                    value={value || ''}
                    onChange={this.handleChange}
                    type={type}
                />
                <span className={st.errorText}>{errorMessage}</span>
            </div>
        )
    }
}


MyInput.propTypes = {
    // title: PropTypes.string.isRequired,
    // time: PropTypes.number.isRequired,
    // price: PropTypes.number.isRequired,
    // id: PropTypes.number.isRequired
}
export default withFormsy(MyInput);
