import React from "react";
import logo from "../logo.svg";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../App.css";

export default function Home() {
	return (
		<React.Fragment>
			<CssBaseline />
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<p>
						Add to cors exception:
						<br />
						*://*.smartsheet.com/*
						<br />
						*://localhost:*/*
					</p>
				</header>
			</div>
		</React.Fragment>
	);
}
