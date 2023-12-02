/*
IMPORT:
import db from "../components/modules/db";

USAGE:
db.get(2022, "special_teams_punts").then(data => {
	console.log(data);
	// do stuff
});

*/

function DB() {
	const api_endpoint = "http://localhost:3001/api/data";

	function translateToKey(side, stat) {
		return `${side.toLowerCase()} ${stat.toLowerCase()}`.replace(/ /g, "_");
	}

	return {
		get: function(data) {
			if (data.year === null || data.side === null || data.stat === null) { return; }
			const result = fetch(`${api_endpoint}?year=${data.year}&key=${translateToKey(data.side, data.stat)}`);
			return result.then(response => response.text());
		}
	}
}

export default DB();