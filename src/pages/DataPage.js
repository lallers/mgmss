import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loading from "../components/Loading";
import ToolbarMenu from "../components/ToolbarMenu";
import Checkbox from "@material-ui/core/Checkbox";
import Error from "../components/Error";
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
	const [sheetData, setSheetData] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const response = await axios
				.get(`https://api.smartsheet.com/2.0/sheets/${sheetId}`)
				.then(function(response) {
					// handle success
					console.log("axios response", response);
					return response;
				})
				.catch(function(error) {
					// handle error
					console.log("axios error", error.response);
					setError(error.response);
					return error;
				});
			setLoading(false);
			setSheetData(response.data);
		}
		setLoading(true);
		fetchData();
	}, [sheetId]);

	return (
		<React.Fragment>
			<ToolbarMenu {...sheetData} />
			<div className={classes.root}>
				<Loading isLoading={isLoading} />
				<Error {...error} />

				<Paper className={classes.paper}>
					<Table className={classes.table} size="small">
						<TableHead>
							<TableRow>
								<TableCell component="th" scope="row" key={`cell-select-all`}>
									<Checkbox />
								</TableCell>
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
								? sheetData.rows.map((row, idx) => {
										return (
											<TableRow key={`row-${row.id}`}>
												<TableCell
													component="th"
													scope="row"
													key={`cell-select-${idx}`}
												>
													<Checkbox />
												</TableCell>
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
		</React.Fragment>
	);
}
