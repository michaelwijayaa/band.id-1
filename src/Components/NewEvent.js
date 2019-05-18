import React, { Component } from 'react'
import Axios from 'axios'
import { Card } from 'react-mdl'
import { TextField, Button } from '@material-ui/core';

class NewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            location: '',
            date: '',
            description: ''
            // eventImage: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInput(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit(event) {
        event.preventDefault();
        Axios.post('/events', {
            name: this.state.name,
            location: this.state.location,
            date: this.state.date,
            description: this.state.description
        }).then(res => {
            console.log(res)
            this.props.history.push('/event');
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <Card className='NewEvent' shadow={3} style={{ margin: 'auto', marginBottom: '100px', marginTop: '100px', padding: '30px' }}>
                <h2 style={{ textAlign: 'center' }}> New Event </h2>
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
                    <h5>Location</h5>
                    <TextField
                        name="location"
                        label="Location"
                        value={this.state.location}
                        type="text"
                        onChange={(event) => this.handleInput(event)}
                    />
                    <br />
                    <h5>Date</h5>
                    <TextField
                        name="date"
                        value={this.state.date}
                        type="date"
                        onChange={(event) => this.handleInput(event)}
                    />
                    <br />
                    <h5>Description</h5>
                    <TextField
                        type="text"
                        name="description"
                        label="Description"
                        value={this.state.description}
                        onChange={(event) => this.handleInput(event)}
                    />
                    <br />
                    <Button label='NewEvent' type='submit' style={{ margin: '50px' }}> List This Event </Button>
                </form>
            </Card>
        );
    }


}

export default NewEvent
