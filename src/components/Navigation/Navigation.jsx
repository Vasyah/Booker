import React from 'react';
import st from './Navigation.module.scss';
import { useState } from 'react';
import leftArrow from './leftArrow.svg';
import { Link } from 'react-router-dom';
const Navigation = (props) => {
    const [visible, setVisible] = useState(false);
    const toggle = (e) => {
        setVisible(!visible);
    }
    const visibleClass = visible ? `${st.visible}` : `${st.hidden}`;
    const sidebar = `${st.sidebar} ${visibleClass}`
    const mobClass = visible ? `${st.btn__mobMenuVisible}` : '';
    const mobClassFull = `${st.btn} ${mobClass}`;
    return (
        <>
            <nav className={sidebar} id="sidebar">
                <Link className={st.link} onClick={toggle} to="/">HOME</Link>
                <Link className={st.link} onClick={toggle} to="/services">SERVICES</Link>
                <Link className={st.link} onClick={toggle} to="/workdays">WORKDAYS</Link>
                <button onClick={toggle} className={mobClassFull}>
                    <img src={leftArrow} alt="" />
                </button>
            </nav>
        </>
    )
}


// Navigation.propTypes = {
// title: PropTypes.string.isRequired,
// time: PropTypes.number.isRequired,
// price: PropTypes.number.isRequired,
// id: PropTypes.number.isRequired
// }
export default Navigation;
