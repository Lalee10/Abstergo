import React, { Component } from "react";
import Content from "../General/Content";
import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

class Student extends Component {
	render() {
		return <Content entity="Student" link="students" addIcon={faUserPlus} viewIcon={faUsers} />;
	}
}

export default Student;
