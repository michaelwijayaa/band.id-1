import React, { PureComponent } from 'react'
import { getToken } from '../Helpers/jwt';
import Axios from 'axios';
import { Card, Button, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActions } from "@material-ui/core";

class Profile extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: [],
            loggedin: true
        }
        this.logOut = this.logOut.bind(this)
    }

    componentDidMount() {
        const jwt = getToken();
        if (!jwt) {
            this.props.history.push('/login');
        } else {
            Axios.get('/profile')
                .then(response => {
                    // console.log(response)
                    const userData = response.data;
                    this.setState({ user: userData });
                })
                .catch(function (error) {
                    // console.log(error)
                })
        }
    }

    logOut() {
        const token = getToken();
        if (token) {
            this.setState({ loggedin: false })
            localStorage.removeItem('token');
            this.props.history.push('/login')
        }
        else {
            console.log('User not logged in')
            this.props.history.push('/login')
        }
    }

    render() {
        console.log(this.state.user)
        console.log(this.state.user.user)
        if (this.state.user.user != null && typeof this.state.user.user != undefined) {
            return (
                <div className="wrapper">
                    <h1>Hello, {this.state.user.user.username} ! </h1>
                    <h3>User Info</h3>
                    <h5>Name : {this.state.user.user.name} </h5>
                    <h5>Email : {this.state.user.user.email} </h5>
                    {/* <h5>Password : {this.state.user.user.password} </h5> */}
                    <button onClick={(event) => this.logOut(event)}>Log Out</button>
                </div>
                // <div className="user">
                //         <Card className='userCard'>
                //             <CardHeader
                //                 avatar={<Avatar>E</Avatar>}
                //                 title={user.name}
                //                 subheader={user.email}
                //             />
                //             {/* <CardContent>
                //                 <Typography variant="h6">
                //                     {event.location}
                //                 </Typography>
                //                 <Typography variant="p">
                //                     {event.description}
                //                 </Typography>
                //             </CardContent> */}
                //             <CardActions border>
                //                 <button onClick={(event) => this.logOut(event)}>Log Out</button>
                //             </CardActions>
                //         </Card>
                // </div>
            )
        } else {
            return (
                <h2> No Record </h2>
            )
        }
    }
}

export default Profile

// if (this.state.user === undefined) {
//     return (
//         <div> Loading </div>
//     )
// }
