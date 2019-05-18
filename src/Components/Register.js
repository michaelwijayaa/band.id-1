import React, { Component } from 'react';
import Axios from 'axios';
import { Card } from 'react-mdl';
import { TextField, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Button } from '@material-ui/core';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            password2: '',
            role: ''
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
        Axios.post('/users/register', {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            role: this.state.role
        }).then(res => {
            console.log(res)
            this.props.history.push('/login');
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <Card className='Register' shadow={3} style={{ margin: 'auto', marginBottom: '100px', marginTop: '100px', padding: '30px' }}>
                <h2 style={{ textAlign: 'center' }}> Register </h2>
                <form onSubmit={(event) => this.onSubmit(event)} style={{ marginLeft: '50px' }}>
                    <h5>Name</h5>
                    <TextField
                        name='name'
                        label='Name'
                        value={this.state.name}
                        type='text'
                        onChange={(event) => this.handleInput(event)}
                    />
                    <br />
                    <h5>Username</h5>
                    <TextField
                        name="username"
                        label="Username"
                        value={this.state.username}
                        type="text"
                        onChange={(event) => this.handleInput(event)}
                    />
                    <br />
                    <h5>Email</h5>
                    <TextField
                        name="email"
                        label="Email"
                        value={this.state.email}
                        type="email"
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
                    <h5>Re-enter Password</h5>
                    <TextField
                        type="password"
                        name="password2"
                        label="Re-enter Password"
                        value={this.state.password2}
                        onChange={(event) => this.handleInput(event)}
                    />
                    <br />
                    <br />
                    <FormControl>
                        <FormLabel component='legend'>Role</FormLabel>
                        <RadioGroup
                            aria-label='role'
                            name='role'
                            value={this.state.role}
                            onChange={(event) => this.handleInput(event)}
                        >
                            <FormControlLabel
                                value='EO'
                                control={<Radio color='primary' />}
                                label='EO'
                                labelPlacement='end'
                            />
                            <FormControlLabel
                                value='band'
                                control={<Radio color='primary' />}
                                label='Band'
                                labelPlacement='end'
                            />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <Button label='Register' type='submit' style={{ margin: '50px' }} > Sign Me Up </Button>
                </form>
            </Card>
        );
    }
}

export default Register
