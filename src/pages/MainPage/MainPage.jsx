import { Link } from "react-router-dom";
import css from "./MainPage.module.css";

export default function MainPage() {
  return (
    <>
      <div className={css.section}>
        <div className={`container ${css.containerHero}`}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.text}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link to="/catalog" className={css.btnLink}>
            View Catalog
          </Link>
        </div>
      </div>
    </>
  );
}
