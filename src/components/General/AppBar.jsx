import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import history from "../history";
import Axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

class MyAppBar extends Component {
	state = { loading: false };
	render() {
		const { classes, appBarTitle } = this.props;
		const { loading } = this.state;
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							onClick={() => history.push("/")}
							className={classes.menuButton}
							color="inherit"
							aria-label="Menu"
						>
							<HomeIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" className={classes.grow}>
							{appBarTitle}
						</Typography>
						{!loading ? (
							<Button
								onClick={async () => {
									this.setState({ loading: true });
									try {
										await Axios.get("/logout");
										this.setState({ loading: false }, () => {
											history.push("/login");
										});
									} catch (error) {
										toast.error("There was an error logging out");
										this.setState({ loading: false });
									}
								}}
								color="inherit"
							>
								Logout
							</Button>
						) : (
							<Button color="inherit">
								<CircularProgress color="secondary" />
							</Button>
						)}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(MyAppBar);
