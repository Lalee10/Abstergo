import React, { Component } from "react";
import Content from "../General/Content";
import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

class Teacher extends Component {
	render() {
		return <Content entity="Teacher" link="teachers" addIcon={faUserPlus} viewIcon={faUsers} />;
	}
}

export default Teacher;
