import React from 'react';
import st from './MyLoader.module.scss';

const MyLoader = (props) => {
    return (
        <div className={st.container}>
            <div className={st.loader}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>
    )
}


MyLoader.propTypes = {
    // title: PropTypes.string.isRequired,
    // time: PropTypes.number.isRequired,
    // price: PropTypes.number.isRequired,
    // id: PropTypes.number.isRequired
}
export default MyLoader;
