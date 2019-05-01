import React from "react"
import { Link } from "react-router-dom"
import HomeIcon from "@material-ui/icons/Home"
import AssessmentIcon from "@material-ui/icons/Assessment"
import PersonIcon from "@material-ui/icons/Person"
import BookIcon from "@material-ui/icons/Book"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

const jsonSidebar = [
	{ text: "Dashboard", Icon: HomeIcon, route: "/" },
	{ text: "Tests", Icon: AssessmentIcon, route: "/test" },
	{ text: "Students", Icon: PersonIcon, route: "/student" },
	{ text: "Teacher", Icon: BookIcon, route: "/teacher" },
]

class Sidebar extends React.Component {
	render() {
		const { classes, open, drawerClose } = this.props
		return (
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={drawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<nav>
					<Divider />
					<List>
						{jsonSidebar.map(elem => (
							<Link key={elem.text} to={elem.route} style={{ textDecoration: "none" }}>
								<ListItem button>
									<ListItemIcon>
										<elem.Icon />
									</ListItemIcon>
									<ListItemText primary={elem.text} />
								</ListItem>
							</Link>
						))}
					</List>
				</nav>
			</Drawer>
		)
	}
}

export default Sidebar
