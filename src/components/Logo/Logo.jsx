import { Link } from "react-router-dom";
import css from "./Logo.module.css";

export default function Logo() {
  return (
    <Link className={css.link} to="/">
      <svg className={css.icon} width="104" height="16">
        <use href="/sprite.svg#icon-logo" />
      </svg>
    </Link>
  );
}
