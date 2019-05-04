import React, { Component } from "react";
import Content from "../General/Content";
import { faFolderPlus, faFolder } from "@fortawesome/free-solid-svg-icons";

class Test extends Component {
	render() {
		return <Content entity="Test" link="tests" addIcon={faFolderPlus} viewIcon={faFolder} />;
	}
}

export default Test;
