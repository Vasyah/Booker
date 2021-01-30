import React from 'react';
import st from './Root.module.scss';
import ServiceList_w from './ServiceList';
import { Route, Switch } from 'react-router-dom';
import Workdays from './Workdays';
import './Root.scss';
import { Provider } from 'react-redux';
import store from './store/store';
import Navigation from "./Navigation/Navigation";
const Root = () => {
    return (
        <Provider store={store}>
            <div className={`Root ${st.wrapper}`} >
                <Navigation/>
                <Switch>
                    <Route path="/services" component={ServiceList_w} />
                    <Route path="/workdays" component={Workdays} />
                </Switch>
            </div>
        </Provider>
    )
}
export default Root;
