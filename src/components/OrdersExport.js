import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import * as jsPDF from "jspdf";

const resolveAfter5Seconds = data => {
	console.log("resolveAfter5Seconds", data);
	return new Promise(resolve => {
		let doc = new jsPDF();
		let textLength;
		console.log(doc);
		textLength = centerText("Lab Supply Order Form", doc);
		doc.text("Lab Supply Order Form", textLength, 10);
		textLength = centerText(
			"Department of Molecular Genetics & Microbiology",
			doc
		);
		doc.text("Department of Molecular Genetics & Microbiology", textLength, 20);
		doc.save("two-by-four.pdf");

		resolve(doc);
		//console.log("resolve:", resolve);
		//setTimeout(() => {
		//		resolve("resolved");
		//	}, 5000);
	});
};
const centerText = (text, doc) => {
	const defaultPageWidth = doc.internal.pageSize.getWidth();
	const defaultFontSize = doc.internal.getFontSize();
	const defaultScaleFactor = doc.internal.scaleFactor;
	return (
		(defaultPageWidth -
			(doc.getStringUnitWidth(text) * defaultFontSize) / defaultScaleFactor) /
		2
	);
};

export default function OrdersExport(props) {
	const { data } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const [doingWork, setDoingWork] = useState(false);
	const [readyToWork, setReadyToWork] = useState(false);

	function handleClick(e) {
		setAnchorEl(e.currentTarget);
	}
	function handleClose() {
		setAnchorEl(null);
	}
	const handleStandardPdfClick = e => {
		handleClose();
		console.log("clicked standard");
	};
	const handleOrderPdfClick = (e, data) => {
		handleClose();
		console.log("In click: ", data);
		if (doingWork || !readyToWork) {
			console.log("doingwork: ", doingWork, "readytowork: ", readyToWork);
			return;
		}
		makePdf(data);
	};

	const makePdf = async data => {
		setDoingWork(true);
		const response = await resolveAfter5Seconds(data);
		console.log("res", response);
		setDoingWork(false);
		setReadyToWork(true);
	};

	useEffect(() => {
		setReadyToWork(true);
	}, []);
	return (
		<React.Fragment>
			<Button
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
				variant="contained"
				color="primary"
			>
				PDF
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleStandardPdfClick}>Standard</MenuItem>
				<MenuItem onClick={e => handleOrderPdfClick(e, data)}>Order</MenuItem>
			</Menu>
		</React.Fragment>
	);
}
