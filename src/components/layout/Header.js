import css from "./Header.module.css";

function Header() {
	return (
		<header className={css.header}>
			<div className={css.title}>NFL Stats</div>
			{/* <nav>
				<ul>
					<li></li>
					<li></li>
				</ul>
			</nav> */}
		</header>
	);
}

export default Header;