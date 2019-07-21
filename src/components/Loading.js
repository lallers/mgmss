import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
	progress: {
		position: "fixed",
		top: "50%",
		left: "50%",
		transform: " translate(-50%, -50%)",
		transform: "-webkit-translate(-50%, -50%)",
		transform: "-moz-translate(-50%, -50%)",
		transform: "-ms-translate(-50%, -50%)"
	},
	page: {
		position: "fixed",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.8)",
		zIndex: "999",
		marginTop: -theme.spacing(3)
	}
}));

export default function Loading(props) {
	const classes = useStyles();
	const { isLoading } = props;

	return (
		<React.Fragment>
			{isLoading ? (
				<div className={classes.page}>
					<CircularProgress
						size={99}
						className={classes.progress}
						color="secondary"
					/>
				</div>
			) : null}
		</React.Fragment>
	);
}
