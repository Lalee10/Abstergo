import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import { toast } from "react-toastify";

const styles = theme => ({
	main: {
		width: "auto",
		display: "block", // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
});

class Login extends Component {
	state = {
		username: "",
		password: "",
		loading: false,
	};

	handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value });
	};

	onSubmit = async e => {
		this.setState({ loading: true });
		const data = { username: this.state.username, password: this.state.password };
		const response = await axios.post("/login", data);
		if (response.status === 200) {
			/**
			 *  Set user state and redirect to dashboard
			 */
			toast.success("Login Successful");
			this.props.appRef.setState({ user: response.data, loading: false }, () => {
				this.props.history.push("/");
			});
		} else {
			/**
			 *  Flash error
			 */
			toast.error("Login failed!");
			this.setState({ loading: false });
		}
	};

	render() {
		const { classes } = this.props;
		const { loading } = this.state;

		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Abstergo
					</Typography>
					<form className={classes.form}>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="username">Username</InputLabel>
							<Input
								onChange={this.handleChange}
								id="username"
								name="username"
								autoComplete="username"
								autoFocus
							/>
						</FormControl>
						<FormControl margin="normal" required fullWidth>
							<InputLabel htmlFor="password">Password</InputLabel>
							<Input
								onChange={this.handleChange}
								name="password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</FormControl>
						<Button
							onClick={this.onSubmit}
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Log In
						</Button>
					</form>
					<LinearProgress hidden={!loading} />
				</Paper>
			</main>
		);
	}
}

export default withStyles(styles)(Login);
