import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { withStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Header from "./Header"
import Content from "./Content"
import Sidebar from "./Sidebar"

const drawerWidth = 240

const styles = theme => ({
	root: {
		display: "flex",
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: "0 8px",
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
})

class Dashboard extends React.Component {
	state = {
		open: false,
	}

	handleDrawerOpen = () => {
		this.setState({ open: true })
	}

	handleDrawerClose = () => {
		this.setState({ open: false })
	}

	render() {
		const { classes } = this.props
		const { open } = this.state

		return (
			<div className={classes.root}>
				<CssBaseline />

				{/* Header Component containing AppBar from Material UI */}
				<Header
					appBarClass={classNames(classes.appBar, {
						[classes.appBarShift]: open,
					})}
					menuButtonClass={classNames(classes.menuButton, open && classes.hide)}
					drawerOpen={this.handleDrawerOpen}
					open={open}
				/>

				{/* Main Sidebar Component */}
				<Sidebar classes={classes} open={open} drawerClose={this.handleDrawerClose} />

				{/* Main Content Area. This contains a switch for all the routes to be loaded */}
				<Content
					mainClass={classNames(classes.content, {
						[classes.contentShift]: open,
					})}
					divClass={classes.drawerHeader}
				/>
			</div>
		)
	}
}

Dashboard.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Dashboard)
