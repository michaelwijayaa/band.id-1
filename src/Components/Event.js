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
	CardActions
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
				.catch(function(error) {
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
							<Grid className='eventCard'>
								<Card
									key={event._id}
									shadow={5}
									style={{ width: "300px", height: "320px", margin: "auto" }}
								>
									<CardHeader
										avatar={<Avatar>E</Avatar>}
										title={event.name}
										subheader={event.date}
									/>
									<CardMedia>
										<img src={event.eventImage} />
									</CardMedia>
									<CardContent>
										<Typography variant='h6'>{event.location}</Typography>
										<Typography variant='p'>{event.description}</Typography>
									</CardContent>
									{/* <CardTitle expand style={{ color: '#fff', background: '#000' }}>{event.name}</CardTitle>
                                    <CardText>
                                        <h5>Location : {event.location}</h5>
                                        <p>Description : {event.description}</p>
                                        <p>Link : {event.request.url}</p>
                                    </CardText> */}
									<CardActions border>
										<Button onCLick={event => this.handleClick(event)} colored>
											Event Details
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</div>
				</Layout>
			);
		} else {
			return <h2> No Record </h2>;
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
