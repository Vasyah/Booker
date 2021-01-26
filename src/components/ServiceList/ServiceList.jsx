import React from 'react';
import st from './ServiceList.module.scss';

import Service from './Service';
import ServiceForm from './ServiceForm';
// import Button from './../Button'
import classNames from 'classnames';
import axiosConfig from '../../api/';

class ServiceList extends React.Component {

    state = { services: [] };
    // для сохранения контекста делаем метод - стрелочной функцией
    addService = (service) => {
        // если хотя бы одно поле пустое - то не пишем
        // задать типы
        console.log(service);
        axiosConfig
            .post('/services', service)
            .then(res => {
                console.log(res);
                const service = res.data.data;
                this.setState(prevState => ({
                    services: [
                        ...prevState.services,
                        { ...service }
                    ]
                }));
                if (res.status === "OK") return true;
            })
    }

    editService = (service) => {
        console.log(service);
        axiosConfig
            .post('/services', service)
            .then(res => {
                console.log(res);
                const serviceData = res.data.data;
                const { id } = serviceData;
                this.setState(prevState => ({
                    services: [
                        prevState.services.forEach(service => {
                            const isExist = service.id === id
                            if (isExist) {
                                service = serviceData;
                            }
                            return service
                        }),
                    ]
                }));
                if (res.status === "OK") return true;
            })
    }
    // rmService() {

    // }
    // saveService() {

    // }
    componentDidMount() {
        axiosConfig
            .get('/services').then(response => {
                console.log(response.data.data);
                this.setState({ services: response.data.data });
            })
            .catch(() => this.setState({ message: 'NETWORK_ERROR', loading: false }));
    }

    render() {
        return (
            <div className="">
                <h3 className={st.title}>Добавьте свои услуги</h3>
                <ServiceForm addService={this.addService} />
                <Service
                    title="Название услуги"
                    time="Длительность"
                    price="Стоимость"
                />
                {this.state.services.map(({ id, title, time, price }) => (
                    <Service
                        isEdit={true}
                        title={title}
                        time={time}
                        price={price}
                        key={id}
                    />
                ))}
                {/* <saveButton/> */}
            </div>
        )
    }
}

export default ServiceList;





    // // state = { tasks };
    // constructor(props) {
    //     super(props);
    //     this.state =  { tasks };
    // }
    // filterActive = () => {
    //     const activeTasks = this.state.tasks.filter(task => !task.completed);
    //     this.setState({ tasks: activeTasks });
    // }

    // toggleCompleted = (event) => {
    //     const { tasks } = this.state;
    //     const id = Number(event.target.dataset.id);
    //     const updatedTasks = tasks.map(task => {
    //         if (task.id === id) {
    //             task.completed = !task.completed
    //         }
    //         return task;
    //     });
    //     this.setState({ tasks: updatedTasks });
    // }

    // addTask = title => {
    //     this.setState(prevState => ({
    //         // взяли старый объект и записали новй
    //         // но затем будем делать запросы на сервак
    //         tasks: [
    //             ...prevState.tasks,
    //             { id: Math.random(), title, completed: false }
    //         ]
    //     }))
    // }
    // render() {
    //     return (
    //         <div className="tasks-list">
    //             <TaskForm addTask={this.addTask} />
    //             {this.state.tasks.map(({ title, completed, id }) => (
    //                 <Task
    //                     title={title}
    //                     completed={completed}
    //                     toggleCompleted={this.toggleCompleted}
    //                     id={id}
    //                     key={id}
    //                 />
    //             ))}
    //             <Button label="Выполненны" onClick={this.filterActive} />
    //         </div>
    //     );
    // }