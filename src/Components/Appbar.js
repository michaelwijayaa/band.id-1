import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Navigation, Drawer, Layout, Content } from 'react-mdl'

const Appbar = () => {
    return (

        <div style={{ height: '300px', position: 'relative' }}>
            <Layout fixedHeader>
                <Header title={<strong>band.id</strong>}>
                    <Navigation>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                        <Link to='/event'>Events</Link>
                        <Link to='/about'>About</Link>
                        <Link to='/projects'>Projects</Link>
                        <Link to='/contact' title='Contacts'>Contacts</Link>
                    </Navigation>
                </Header>
                <Drawer title="Title">
                    <Navigation>
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                        <Link to='/event'>Events</Link>
                        <Link to='/about'>About</Link>
                        <Link to='/projects'>Projects</Link>
                        <Link to='/contact' title='Contacts'>Contacts</Link>
                    </Navigation>
                </Drawer>
                <Content />
            </Layout>
        </div>
    );
}

export default Appbar
