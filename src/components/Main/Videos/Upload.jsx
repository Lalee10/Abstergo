import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
	mainGrid: {
		margin: "64px auto",
		width: "35%",
	},

	appBar: {
		alignItems: "center",
	},

	btn: {
		marginTop: "16px",
		marginLeft: "24px",
	},

	uploadDiv: {
		textAlign: "center",
	},

	info: {
		minWidth: "50px",
		overflow: "hidden",
		textAlign: "center",
		backgroundColor: "green",
	},

	infoText: {
		color: "#FFF",
		fontWeight: "700",
	},
});

class Upload extends Component {
	onNameChange = event => {
		this.setState({ name: event.target.value });
	};

	onDescChange = event => {
		this.setState({ description: event.target.value });
	};

	onChangeHandler = event => {
		console.log(event.target.files[0]);

		this.setState({
			selectedFile: event.target.files[0],
			loaded: 0,
		});
	};

	onClickHandler = () => {
		if (!this.state.selectedFile) {
			return;
		}
		const data = new FormData();
		data.append("file", this.state.selectedFile);
		data.append("name", this.state.name);
		data.append("description", this.state.description);
		console.log(data.get("name"));
		console.log(data.get("description"));
		axios
			.post("http://localhost:8080/upload", data, {
				// receive two parameter endpoint url ,form data
			})
			.then(res => {
				// then print response status
				console.log(res.statusText);
				if (res.status === 200) {
					this.setState({ uploadSucess: true }, () => {
						setTimeout(() => {
							this.setState({ uploadSucess: false });
						}, 2500);
					});
				}
			});
	};

	constructor(props) {
		super(props);
		this.state = {
			selectedFile: null,
			uploadSucess: false,
			name: "",
			description: "",
		};
	}

	render() {
		return (
			<div>
				<AppBar position="static" className={this.props.classes.appBar}>
					<Toolbar>
						<Typography variant="h6" color="inherit" align="center" noWrap>
							Upload Video
						</Typography>
					</Toolbar>
				</AppBar>
				<Grid className={this.props.classes.mainGrid} spacing={16} justify="center" alignContent="center">
					<Card>
						<CardContent>
							<form method="post" action="#" id="#">
								<div className={this.props.classes.uploadDiv}>
									<Typography variant="h5" color="inherit" align="center" noWrap>
										Choose file then click upload
									</Typography>
									<input
										style={{ display: "none" }}
										id="raised-button-file"
										type="file"
										class="form-control"
										multiple=""
										onChange={this.onChangeHandler}
									/>
									<label htmlFor="raised-button-file">
										<Button variant="raised" component="span" className={this.props.classes.button}>
											Choose file
										</Button>
									</label>
									<div>
										<Typography variant="h6" color="inherit" align="center" noWrap>
											{this.state.selectedFile
												? this.state.selectedFile.name
												: "No File Selected"}
										</Typography>
									</div>
									<TextField
										required
										id="vidName"
										name="vidName"
										label="Name"
										fullWidth
										onChange={this.onNameChange}
										value={this.state.name}
									/>

									<TextField
										id="vidDesc"
										name="vidDesc"
										label="Description"
										fullWidth
										value={this.state.description}
										onChange={this.onDescChange}
									/>
									<div>
										<Button
											className={this.props.classes.btn}
											color="primary"
											variant="contained"
											onClick={this.onClickHandler}
										>
											Upload
										</Button>
									</div>
								</div>
							</form>
						</CardContent>
					</Card>
				</Grid>

				<Grid className={this.props.classes.mainGrid} spacing={16} justify="center" alignContent="center">
					<Grow in={this.state.uploadSucess}>
						<Card className={this.props.classes.info}>
							<CardContent className={this.props.classes.infoText}>Upload successful!</CardContent>
						</Card>
					</Grow>
				</Grid>
			</div>
		);
	}
}

Upload.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Upload);
