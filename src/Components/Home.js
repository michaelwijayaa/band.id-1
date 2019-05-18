import React from 'react'
import Appbar from './Appbar';
import { Layout, Grid, Cell } from 'react-mdl'
import '../css/Style.css'

const Home = (props) => {
    return (
        <div className='Home'>
            <Layout fixedHeader>
                {/* <Appbar /> */}
                <Cell col={12}>
                    <div className='banner'>
                        <hr />
                        <h1>start your superstar career <span>NOW</span> !</h1>
                        <hr />
                        <img className='center' src='https://i.imgur.com/SCqW3E2.jpg' alt='background' />
                    </div>
                </Cell>
            </Layout>
        </div>
    );
}

export default Home
