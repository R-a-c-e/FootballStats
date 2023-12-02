import css from "./Section.module.css";

function Section(props) {
	return <div className={css.section}>{props.children}</div>;
}

export default Section;