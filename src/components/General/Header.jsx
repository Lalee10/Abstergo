import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Typography from "@material-ui/core/Typography"

class Header extends React.Component {
	render() {
		const { appBarClass, menuButtonClass, drawerOpen, open } = this.props
		return (
			<AppBar position='fixed' className={appBarClass}>
				<Toolbar disableGutters={!open}>
					<IconButton
						color='inherit'
						aria-label='Open drawer'
						onClick={drawerOpen}
						className={menuButtonClass}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' color='inherit' noWrap>
						Software Construction Unplugged
					</Typography>
				</Toolbar>
			</AppBar>
		)
	}
}

export default Header
