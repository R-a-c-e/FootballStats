import css from "./Footer.module.css";

function Footer() {
	return (
		<footer className={css.footer}>
			<div className={css.msg}>Created by Ryan Skabelund, Peter Vargas, Race Musgrave, and Rock Palmer</div>
		</footer>
	);
}

export default Footer;