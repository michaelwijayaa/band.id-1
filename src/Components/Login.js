import React, { Component } from 'react'
import Axios from 'axios';
import { Layout, Card } from 'react-mdl'
import { TextField, Button } from '@material-ui/core';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        Axios.post('/users/login', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            localStorage.setItem('token', res.data);
            this.props.history.push('/profile');
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <Layout>
                <Card className='Login' shadow={3} style={{ margin: 'auto', marginBottom: '100px', marginTop: '100px', padding: '30px' }}>
                    <h2 style={{ textAlign: 'center' }}> Login </h2>
                    <form onSubmit={(event) => this.onSubmit(event)} style={{ marginLeft: '50px' }}>
                        <h5>Username</h5>
                        <TextField
                            name="username"
                            label="Username"
                            value={this.state.username}
                            type="text"
                            onChange={(event) => this.handleInput(event)}
                        />
                        <br />
                        <h5>Password</h5>
                        <TextField
                            type="password"
                            name="password"
                            label="Password"
                            value={this.state.password}
                            onChange={(event) => this.handleInput(event)}
                        />
                        <br />
                        <Button label='Login' type='submit' style={{ margin: '50px' }}>Login</Button>
                    </form>
                    <br />
                </Card>
            </Layout>
        );
    }
}

export default Login
