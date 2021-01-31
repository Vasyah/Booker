import React from 'react';
import st from './ServiceList.module.scss';

import Service from './Service';
import ServiceForm_W from './ServiceForm';
// import Button from './../Button'
import classNames from 'classnames';
import axiosConfig from '../../api/';
import { connect } from 'react-redux';
import { addService } from "../store/actions/services/addService";
import { getServices } from "../store/actions/services/getServices";
import MyLoader from "./../MyLoader/MyLoader";
import locale from '../../locale';
class ServiceList extends React.Component {

    deleteService = (id) => {
        // ACTION DELETE
        axiosConfig
            .delete(`/services/${id}`)
            .then(res => {
                const newState = this.state.services.filter((s) => {
                    return s.id !== id;
                });
                newState.length ? this.setState({ services: [...newState] }) :
                    this.setState({ services: [] });
            });

    }

    componentDidMount() {
        const { getServices } = this.props;
        getServices();
    }

    render() {
        const { serviceList } = locale;
        const { title } = serviceList;
        const { services, loading, error } = this.props
        const emptyModal = services.length === 0 && <div className={st.emptyModal}>Service List is empty</div>;
        const alertModal = <div className={st.alertModal}>ЧТО-ТО НЕ ТАК С СЕРЕВЕРОМ</div>;
        return (
            <div className={st.container}>
                <h3 className="title">{title}</h3>
                {loading && <MyLoader />}
                <ServiceForm_W />
                <div className={st.grid}>
                    <Service
                        isEditable={false}
                        title="Title"
                        time="Duration"
                        price="Cost"
                    />
                    {loading ? '' : error === null ? emptyModal : alertModal}
                    {services.map(({ id, title, time, price }) => (
                        <Service
                            deleteService={this.deleteService}
                            editService={this.editService}
                            isEditable={true}
                            isEdit={true}
                            title={title}
                            time={time}
                            price={price}
                            key={id}
                            id={id}
                        />
                    ))}
                </div>
                {/* <saveButton/> */}
            </div>
        )
    }
}

const mapStateToProps = ({ serviceReducers }) => {
    const { services, loading, error } = serviceReducers;
    return {
        services: [...services],
        loading,
        error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getServices: () => {
            dispatch(getServices());
        }
    }
}
const ServiceList_w = connect(mapStateToProps, mapDispatchToProps)(ServiceList);
export default ServiceList_w;



