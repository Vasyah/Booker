import React from 'react';
import st from './ServiceList.module.scss';

import Service from './Service';
import ServiceForm_W from './ServiceForm';
// import Button from './../Button'
import classNames from 'classnames';
import axiosConfig from '../../api/';
import { connect } from 'react-redux';
import { addService } from "./../store/actions/addService";
import { getServices } from "./../store/actions/getServices";
import MyLoader from "./../MyLoader/MyLoader";
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
        const { services, loading } = this.props;
        return (
            <div className={st.container}>
                <h3 className={st.title}>Добавьте свои услуги</h3>
                {loading && <MyLoader />}
                <ServiceForm_W />
                <div className={st.grid}>
                    <Service
                        isEditable={false}
                        title="Название услуги"
                        time="Длительность"
                        price="Стоимость"
                    />
                    {services.length === 0 && <div className={st.emptyModal}>Список услуг пуст</div>}
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
    const { services, loading } = serviceReducers;
    return {
        services: [...services],
        loading
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



