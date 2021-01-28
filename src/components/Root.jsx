import React from 'react';
import st from './Root.module.scss';
import ServiceList from './ServiceList';
import { Route, Switch } from 'react-router-dom';
import Workdays from './Workdays';
import './Root.scss';
const Root = () => {
    return (
        <div className={`Root ${st.wrapper}`}>
            <Switch>
                <Route path="/services" component={ServiceList} />
                <Route path="/workdays" component={Workdays} />
            </Switch>
        </div>
    )
}
export default Root;
