import Logo from "../Logo/Logo.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import css from "./Header.module.css";

export default function Header() {
  return (
    <>
      <header className={css.header}>
        <div className={`container ${css.container}`}>
          <Logo />
          <Navigation />
        </div>
      </header>
    </>
  );
}
