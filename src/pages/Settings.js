import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { Typography, Divider, TextField } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2)
	},
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200
	}
}));
export default function Settings(props) {
	const classes = useStyles();
	const theme = useTheme();
	return (
		<Container>
			<Paper className={classes.paper}>
				<Typography variant="h3">Settings</Typography>
				<Divider />
				<form className={classes.container} noValidate autoComplete="off">
					<TextField
						id="standard-name"
						label="Smartsheet API Key"
						className={classes.textField}
						value={"tf0qt75nyhhceeo8lqmkllx9y1"}
						margin="normal"
					/>
				</form>
			</Paper>
		</Container>
	);
}
