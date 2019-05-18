import React, { Component } from 'react'
import { getToken } from '../Helpers/jwt';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        const jwt = getToken();
        if (!jwt) {
            this.props.history.push('/Login');
        }
        Axios.get('/getUser', { headers: { Authorization: `Bearer ${jwt}` } })
            .then(res => this.setState({
                user: res.data
            })).catch(err => {
                localStorage.removeItem('token');
                this.props.history.push('/login');
            });
    }

    render() {
        if (this.state.user === undefined) {
            return (
                <div>
                    <h2> Loading </h2>
                </div>
            )
        }

        return (
            <div className='Auth'>
                <h1>This is Auth Page</h1>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(Auth);
