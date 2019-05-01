import React from "react"
import { Route, withRouter } from "react-router-dom"
import Loadable from "react-loadable"
import Spinner from "./Spinner"

const AsyncStudent = Loadable({ loader: () => import("../Main/Student"), loading: Spinner })
const AsyncTeacher = Loadable({ loader: () => import("../Main/Teacher"), loading: Spinner })
const AsyncTest = Loadable({ loader: () => import("../Main/Test"), loading: Spinner })

class Content extends React.Component {
	shouldComponentUpdate = (nextProps, nextState) => {
		return nextProps.location.pathname !== this.props.location.pathname || nextState !== this.state
	}

	render() {
		const { location, mainClass, divClass } = this.props
		return (
			<main className={mainClass}>
				<div className={divClass} />
				<Route exact path='/' component={() => <div>Root Path</div>} />
				<Route path='/student' component={AsyncStudent} />
				<Route path='/test' component={AsyncTest} />
				<Route path='/teacher' component={AsyncTeacher} />
			</main>
		)
	}
}

export default withRouter(Content)
