import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import OrdersExport from "./OrdersExport";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	}
}));

export default function ToolbarMenu(props) {
	console.log("intool", props);

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static" color="white" elevation={0}>
				<Toolbar variant="dense">
					<OrdersExport data={props} />
				</Toolbar>
			</AppBar>
		</div>
	);
}
