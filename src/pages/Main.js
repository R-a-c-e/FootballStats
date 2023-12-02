// import { useContext } from "react";
// import StateContext from "../store/StateContext";

import css from "./Main.module.css";
import Section from "../components/layout/Section";
import Input from "../components/sections/Input";
import Data from "../components/sections/Data";

function Main() {
	// const stateContext = useContext(StateContext);
	
	return (
		<div className={css.main}>
			<Section><Input /></Section>
			<Section><Data /></Section>
		</div>
	);
}

export default Main;