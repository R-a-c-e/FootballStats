import { useContext, useRef } from "react";
import StateContext from "../../store/StateContext";

import css from "./Input.module.css";
import Button from "../ui/Button";

function InputYear() {
	const yearInputRef = useRef();
	const sideInputRef = useRef();
	const statInputRef = useRef();
	const stateContext = useContext(StateContext); 

	function onClickHandler(buttonId) {
		const year = yearInputRef.current.value;
		const side = sideInputRef.current.value;
		const stat = statInputRef.current.value;
		stateContext.updateInput({
			year: (year.length > 0 ? year : null),
			side: (side.length > 0 ? side : null),
			stat: (stat.length > 0 ? stat : null)
		});
	}
	
	return (
		<div>
			<div className={css.title}>Input</div>
			<div>
				<p>The following are the sides/stats:</p>
				<ul className={css.list}>
					<li>Offense</li>
					<ul className={css.list}>
						<li>Passing</li>
						<li>Rushing</li>
						<li>Total Scoring</li>
					</ul>
					<li>Defense</li>
					<ul className={css.list}>
						<li>Passing</li>
						<li>Rushing</li>
						<li>Misc</li>
					</ul>
					<li>Special Teams</li>
					<ul className={css.list}>
						<li>Scoring</li>
						<li>Kickoffs</li>
						<li>Punts</li>
					</ul>
				</ul>
			</div>
			<label htmlFor="year">Please enter the year below:</label>
			<input className={css.input} type="number" ref={yearInputRef} id="year" name="year" spellCheck={false}></input>
			<label htmlFor="side">Please enter the side below:</label>
			<input className={css.input} type="text" ref={sideInputRef} id="side" name="side" spellCheck={false}></input>
			<label htmlFor="stat">Please enter the stat below:</label>
			<input className={css.input} type="text" ref={statInputRef} id="stat" name="stat" spellCheck={false}></input>
			<div className={css.actions}>
				<Button caption="Get data" id="getData" onClick={onClickHandler} />
			</div>
		</div>
	);
}

export default InputYear;