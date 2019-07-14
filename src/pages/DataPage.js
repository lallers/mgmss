import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	},
	paper: {
		marginTop: theme.spacing(3),
		width: "100%",
		overflowX: "auto",
		marginBottom: theme.spacing(2)
	},
	table: {
		minWidth: 650
	}
}));

export default function DataPage(props) {
	const { match, location } = props;
	const { ssDataId: sheetId } = match.params;
	const classes = useStyles();

	const [sheetData, setSheetData] = useState(state => {
		if (state) {
			return;
		}
		if (!sheetId) {
			console.log("No ID provided");
			return;
		}
		axios
			.get(`https://api.smartsheet.com/2.0/sheets/${sheetId}`)
			.then(function(response) {
				if (!sheetData) {
					console.log("sheet data", response);
					setSheetData(response.data);
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

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Table className={classes.table} size="small">
					<TableHead>
						<TableRow>
							{sheetData
								? sheetData.columns.map(item => {
										return (
											<TableCell key={`header-${item.id}`}>{`${
												item.title
											}`}</TableCell>
										);
								  })
								: null}
						</TableRow>
					</TableHead>
					<TableBody>
						{sheetData
							? sheetData.rows.map(row => {
									return (
										<TableRow key={`row-${row.id}`}>
											{row.cells.map((item, index) => {
												let mayBeEmpty = true;
												let cellValue = item.displayValue
													? item.displayValue
													: item.value
													? item.value
													: null;
												if (cellValue && mayBeEmpty == true) {
													mayBeEmpty = false;
												}
                                                
												return (
													<TableCell
														component={index == 0 ? "th" : null}
														scope={index == 0 ? "row" : null}
														key={`cell-${item.columnId}`}
													>
														{`${
															item.displayValue
																? item.displayValue
																: item.value
																? item.value
																: ""
														}`}
													</TableCell>
												);
											})}
										</TableRow>
									);
							  })
							: null}
					</TableBody>
				</Table>
			</Paper>
		</div>
	);
}
