import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, Container, Box } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import red from "@material-ui/core/colors/red";
const primary = red[500]; // #F44336

const useStyles = makeStyles(theme => ({
	page: {
		backgroundColor: primary,
		color: "white",
		margin: theme.spacing(5)
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
}));

export default function Error(props) {
	const classes = useStyles();
	const { config, data, statusText, status } = props;
	return (
		<React.Fragment>
			{status ? (
				<Container>
					<Paper className={classes.page}>
						<List>
							{Object.keys(data).map(key => {
								return (
									<ListItem key={key}>
										{key}: {data[key]}
									</ListItem>
								);
							})}
						</List>
						<ExpansionPanel>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography className={classes.heading}>
									More Details
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<List>
									{Object.keys(config).map(key => {
										return (
											<ListItem key={key}>
												{key}: {data[key]}
											</ListItem>
										);
									})}
								</List>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					</Paper>
				</Container>
			) : null}
		</React.Fragment>
	);
}
