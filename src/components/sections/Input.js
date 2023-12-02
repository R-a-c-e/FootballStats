import { useContext, useRef, useState } from "react";
import StateContext from "../../store/StateContext";

import css from "./Input.module.css";
import Button from "../ui/Button";

function InputYear() {
  const yearInputRef = useRef();
  const sideInputRef = useRef();
  const statInputRef = useRef();
  const stateContext = useContext(StateContext);

  const [statOptions, setStatOptions] = useState([]);

  const yearOptions = Array.from({ length: 53 }, (_, index) => 2022 - index);

  function onClickHandler(buttonId) {
    const year = yearInputRef.current.value;
    const side = sideInputRef.current.value;
    const stat = statInputRef.current.value;
    stateContext.updateInput({
      year: year.length > 0 ? year : null,
      side: side.length > 0 ? side : null,
      stat: stat.length > 0 ? stat : null,
    });
  }

  function onSideChange(event) {
    const selectedSide = event.target.value;
    setStatOptions(getStatOptions(selectedSide));
  }

  function getStatOptions(selectedSide) {
    switch (selectedSide) {
      case "Offense":
        return ["Passing", "Rushing", "Total Scoring"];
      case "Defense":
        return ["Passing", "Rushing", "Takeaways"];
      case "Special Teams":
        return ["Scoring", "Kickoffs", "Punting"];
      default:
        return [];
    }
  }

  return (
    <div>
      <div className={css.title}>Input</div>
      <label htmlFor="year">Please select the year below:</label>
      <select
        className={css.input}
        ref={yearInputRef}
        id="year"
        name="year"
        spellCheck={false}
      >
        {yearOptions.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
      <label htmlFor="side">Please select the side below:</label>
      <select
        className={css.input}
        ref={sideInputRef}
        id="side"
        name="side"
        onChange={onSideChange}
      >
        <option value="Offense">Offense</option>
        <option value="Defense">Defense</option>
        <option value="Special Teams">Special Teams</option>
      </select>
      <label htmlFor="stat">Please select the stat below:</label>
      <select
        className={css.input}
        ref={statInputRef}
        id="stat"
        name="stat"
        spellCheck={false}
      >
        {statOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className={css.actions}>
        <Button caption="Get data" id="getData" onClick={onClickHandler} />
      </div>
    </div>
  );
}

export default InputYear;
