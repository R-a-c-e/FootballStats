import { useContext, useEffect } from "react";
import StateContext from "../../store/StateContext";

import css from "./Data.module.css";
import db from "../../components/modules/db";

function Data() {
	const stateContext = useContext(StateContext);

	function getData() {
		if (stateContext.year === null || stateContext.side === null || stateContext.stat === null) {
			stateContext.updateData(null);
			return;
		}

		stateContext.updateData("loading");

		db.get(stateContext).then(data => {
			data = (data.length > 0 ? data : null);
			stateContext.updateData(data);
		});
	}

	// This updates the page only when the specified states are changed
	useEffect(() => {
		getData();
	}, [stateContext.year, stateContext.side, stateContext.stat]);

	// No data loaded!
	if (stateContext.data === null) {
		return <div />;
	}

	// Data is currently loading. Would be cool to have a spinny thing but meh
	if (stateContext.data === "loading") {
		return (
			<p>loading..</p>
		);
	}

	const output = JSON.parse(stateContext.data);
	const columns = (output.length > 0 ? Object.keys(output[0]) : []);

	// Data is loaded so display it
	return (
		<div>
			<table className="styled-table">
				<thead>
					<tr className={css["styled-table"]}>
						{columns.map((column, index) => (
							<th key={index}>{column}</th>
						))}
					</tr>
				</thead>
				<tbody className={css["styled-table"]}>
					{output.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{columns.map((column, columnIndex) => (
							<td key={columnIndex}>{row[column]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Data;