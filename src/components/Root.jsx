import React from 'react';
import st from './Root.module.scss';

import ServiceList from './ServiceList';
const Root = () => {
    return (
        <div className={`Root ${st.wrapper}`}>
            <ServiceList />
        </div>
    )
}
export default Root;
