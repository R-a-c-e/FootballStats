import { createContext, useState } from "react";

// This section is more so that you can get tooltips when coding
const StateContext = createContext({
	year: null,
	side: null,
	stat: null,
	data: null,
	updateInput: (newInput) => {},
	updateData: (newData) => {}
});

// Create context provider to save state
export function StateContextProvider(props) {
	const [data, setData] = useState({
		year: null,
		side: null,
		stat: null,
		data: null
	});

	function updateInput(newInput) {
		setData(previousState => {
			return {
				...previousState,
				...newInput
			}
		})
	}

	function updateData(newData) {
		setData(previousState => {
			return {
				...previousState,
				data: newData
			};
		});
	}

	const context = {
		year: data.year,
		side: data.side,
		stat: data.stat,
		data: data.data,
		updateInput: updateInput,
		updateData: updateData
	};

	return <StateContext.Provider value={context}>{props.children}</StateContext.Provider>
}

export default StateContext;