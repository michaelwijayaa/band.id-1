import React, { Component } from "react";
import axios from "axios";
// import { Card, Grid, Button } from "react-mdl";
import {
    Card,
    Button,
    CardHeader,
    Avatar,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Paper
} from "@material-ui/core";
import "../css/Event.css";
import { getToken } from "../Helpers/jwt";
import { Layout, Grid } from "react-mdl";

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        };
    }

    componentDidMount() {
        const jwt = getToken();
        if (!jwt) {
            this.props.history.push("/login");
        } else {
            axios
                .get("/events")
                .then(response => {
                    console.log(response);
                    const eventList = response.data;
                    this.setState({ events: eventList });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    handleClick() {
        this.props.history.push("/events/:id");
    }

    render() {
        console.log(this.state.events.events);
        if (
            this.state.events.events != null &&
            typeof this.state.events.events != undefined
        ) {
            return (
                <Layout>
                    <div className='Events'>
                        {this.state.events.events.map(event => (

                            <Grid className='eventList'>
                                {/* <div className='event'
                                    key={event._id}
                                    elevation={1}
                                ><hr />
                                    <Typography variant='h2' component='h2'>
                                        Event Name : {event.name}
                                    </Typography>
                                    <Typography variant='h6' component='h6'>
                                        Location : {event.location}
                                    </Typography>
                                    <Typography component='p'>
                                        {event.description}
                                    </Typography>
                                    <Typography component='h5'>
                                        {event.contact}
                                    </Typography>
                                    <div>
                                        <img src={event.eventImage} />
                                    </div>
                                    <hr />
                                </div> */}
                                <Card
                                    key={event._id}
                                    shadow={5}
                                    style={{ width: "80%", margin: "auto", padding: '10px' }}
                                >
                                    <CardHeader
                                        avatar={<Avatar>E</Avatar>}
                                        title={event.name}
                                        subheader={event.date}
                                    />
                                    <CardMedia>
                                        <img src={event.eventImage} align="right" />
                                    </CardMedia>
                                    <CardContent>
                                        <Typography variant='h6'>{event.location}</Typography>
                                        <Typography variant='p'>{event.description}</Typography>
                                    </CardContent>
                                    <Button>
                                        Apply this Event
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </div>
                </Layout>
            );
        } else {
            return (
                <Card>
                    <h2> Loading . . . </h2>
                </Card>
            );
        }
        // return (<div>event</div>)
    }
}

export default Event;

{
	/* <Card className='eventCard' style={{ maxWidth: '400' }}>
                                <CardHeader
                                    avatar={<Avatar style={{ background: 'red' }}>E</Avatar>}
                                    title={event.name}
                                    subheader={event.date}
                                />
                                <CardMedia style={{ height: '0', paddingTop: '56.25%' }} >
                                    <img src={event.eventImage} />
                                </CardMedia>
                                <CardContent>
                                    <Typography variant="h6">
                                        {event.location}
                                    </Typography>
                                    <Typography variant="p">
                                        {event.description}
                                    </Typography>
                                </CardContent>
                                <CardActions border style={{ display: 'flex' }}>
                                    <Button color='primary' onCLick={(event) => this.handleClick(event)} colored>Event Details</Button>
                                </CardActions>
                            </Card> */
}
