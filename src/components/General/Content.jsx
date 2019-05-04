import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const styles = theme => ({
	mainGrid: {
		position: "absolute",
		width: "100%",
		top: "20%",
	},

	gridItem: {
		marginBottom: "24px",
	},

	card: {
		cursor: "pointer",
		transition: "1s",
		boxShadow: "3px 3px #888888",
		"&:hover": {
			boxShadow: "10px 12px #888888",
			transform: "translate(0px,-20px) rotate(2deg)",
		},
	},

	appBar: {
		alignItems: "center",
	},

	icon: {
		fontSize: "125%",
		marginBottom: "0.45em",
	},

	link: {
		textDecoration: "none",
	},
});

class Content extends React.Component {
	render() {
		const { entity, link, addIcon, viewIcon } = this.props;
		return (
			<div>
				<AppBar position="static" className={this.props.classes.appBar}>
					<Toolbar>
						<Typography variant="h6" color="inherit" align="center" noWrap>
							{entity}
						</Typography>
					</Toolbar>
				</AppBar>

				<Grid
					className={this.props.classes.mainGrid}
					container
					spacing={16}
					justify="center"
					alignContent="center"
				>
					<Fade in={true} timeout={2000}>
						<Grid item sm={7} lg={7} className={this.props.classes.gridItem}>
							<Link to={`/${link}/form`} className={this.props.classes.link}>
								<Card className={this.props.classes.card}>
									<CardContent>
										<Typography
											component="h1"
											variant="h3"
											align="center"
											color="textPrimary"
											gutterBottom
										>
											<FontAwesomeIcon
												className={this.props.classes.icon}
												component="h1"
												variant="h1"
												align="center"
												icon={addIcon}
											/>
											<br />
											Add {entity}
										</Typography>
									</CardContent>
								</Card>
							</Link>
						</Grid>
					</Fade>

					<Fade in={true} timeout={4000}>
						<Grid item sm={7} lg={7} className={this.props.classes.gridItem}>
							<Link to={`/${link}/view`} className={this.props.classes.link}>
								<Card className={this.props.classes.card}>
									<CardContent>
										<Typography
											component="h1"
											variant="h3"
											align="center"
											color="textPrimary"
											gutterBottom
										>
											<FontAwesomeIcon
												className={this.props.classes.icon}
												component="h1"
												variant="h1"
												align="center"
												icon={viewIcon}
											/>
											<br />
											View {entity}
										</Typography>
									</CardContent>
								</Card>
							</Link>
						</Grid>
					</Fade>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Content);
