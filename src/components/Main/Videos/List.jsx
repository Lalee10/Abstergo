import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { throws } from "assert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MyAppBar from "../../General/AppBar";

const styles = theme => ({
	mainGrid: {
		marginTop: "64px",
		paddingRight: "50px",
		marginLeft: "16px",
	},

	appBar: {
		alignItems: "center",
	},

	link: {
		textDecoration: "none",
	},

	cardMedia: {
		paddingTop: "25%",
		height: 0,
		textAlign: "center",
	},
});

const imgStyle = { width: "100%", height: 200 };

class VideoList extends Component {
	handleDelete = async id => {
		let response = await axios.delete("/api/videos", { data: { data: { videoID: id } } });
		console.log(response);
		if (response.status === 200) {
			console.log("GOT 200 RESPONSE");
			window.location.reload();
		}
	};

	state = {
		videos: null,
	};

	async componentDidMount() {
		const videos = (await axios.get("/api/videos")).data;
		console.log("GOT RESPONSE", videos);
		this.setState({ videos: videos });
	}

	renderVideoList = () => {
		if (!this.state.videos) {
			return <div />;
		}
		return this.state.videos.map((video, i) => {
			return (
				<Fade in={true} timeout={500 * (i + 1)}>
					<Grid style={{ textAlign: "center" }} item xs={12} sm={6} md={4} lg={3} key={video.videoID}>
						<Link to={"/videos/" + video.videoID} className={this.props.classes.link}>
							<Card>
								<CardMedia className={this.props.cardMedia}>
									<img src={video.thumbnail} style={imgStyle} />
								</CardMedia>
								<CardContent>
									<Typography
										component="h1"
										variant="h3"
										align="center"
										color="textPrimary"
										gutterBottom
									>
										{video.name}
									</Typography>
								</CardContent>
							</Card>
						</Link>

						{this.props.user.role === "admin" ? (
							<Button
								onClick={() => this.handleDelete(video.videoID)}
								style={{ marginTop: "8px" }}
								variant="contained"
								color="secondary"
							>
								Delete
							</Button>
						) : (
							<div />
						)}
					</Grid>
				</Fade>
			);
		});
	};

	render() {
		return (
			<div>
				<MyAppBar appBarTitle="Videos" />
				<Grid container spacing={16} justify="left" alignContent="left" className={this.props.classes.mainGrid}>
					{this.props.user.role === "teacher" ? (
						<Grid item lg={12} style={{ textAlign: "center" }}>
							<Link to="/videos/upload" style={{ textDecoration: "none" }}>
								<Button variant="contained" color="primary">
									<FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />
									Add New Video
								</Button>
							</Link>
						</Grid>
					) : (
						<span />
					)}

					{this.renderVideoList()}
				</Grid>
			</div>
		);
	}
}

VideoList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoList);
