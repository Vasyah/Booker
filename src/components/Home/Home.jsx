import React from 'react';
import st from './Home.module.scss';
const Home = (props) => {
    return (
        <div className={st.container}>
            <h2>Вы находитесь в административной панели Booker</h2>
            <h2>Booker - это онлайн-брониратор</h2>
            <h2>Он позволит вашим клиентам записаться на предоставление услуг, без участия менеджера</h2>
            <h2>Здесь вы можете настроить ваши услуги и рабочее время</h2>
        </div>
    )
}

export default Home;