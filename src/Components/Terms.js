import React from 'react'
import { Layout } from 'react-mdl'
import { Paper } from '@material-ui/core';


const Terms = props => {
    return (
        <Layout>
            <div>
                <Paper style={{ margin: '40px' }}>
                    <h1> Privacy & Terms </h1>
                    <p> band.id is a simple project of MERN stack </p>
                </Paper>

            </div>
        </Layout>
    );
}

export default Terms
