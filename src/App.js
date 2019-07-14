import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";

import AppNavigation from "./AppNavigation";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import DataPage from "./pages/DataPage";
import NoMatch from "./pages/NoMatch";

const token = "bm3ccwylhyiq8yfqp3ic0t0noq";
const config = {
	headers: { Authorization: "Bearer " + token }
};
axios.defaults.headers.common = { Authorization: "Bearer " + token };

const useStyles = makeStyles(theme => ({
	root: { ...theme.mixins.toolbar, marginTop: "20px" }
}));

export default function App() {
	const [sheets, setSheets] = useState(state => {
		if (state) {
			return;
		}
		axios
			.get("https://api.smartsheet.com/2.0/sheets")
			.then(function(response) {
				if (!sheets) {
					setSheets(response.data);
				}
				console.log(response);
			})
			.catch(function(error) {
				// handle error
				console.log(error);
			})
			.finally(function() {
				// always executed
			});
	});

	const classes = useStyles();
	const theme = useTheme();

	return (
		<React.Fragment>
			<CssBaseline />
			<BrowserRouter>
				<AppNavigation ssData={sheets} />
				<div className={classes.root} />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/view/:ssDataId" component={DataPage}  />
					<Route exact path="/settings" component={Settings} />
					<Route component={NoMatch} />
				</Switch>
			</BrowserRouter>
		</React.Fragment>
	);
}
