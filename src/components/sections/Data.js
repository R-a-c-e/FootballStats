import { useContext, useEffect } from "react";
import StateContext from "../../store/StateContext";

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
			stateContext.updateData(data);
		});
	}

	// This updates the page only when the specified states are changed
	useEffect(() => {
		getData();
	}, [stateContext.year, stateContext.side, stateContext.stat]);

	// No data loaded!
	if (stateContext.data === null ) {
		return <div />;
	}

	// Data is currently loading. Would be cool to have a spinny thing but meh
	if (stateContext.data === "loading") {
		return (
			<p>loading..</p>
		);
	}

	// Data is loaded so display it
	return (
		<div>
			{stateContext.data}
		</div>
	);
}

export default Data;