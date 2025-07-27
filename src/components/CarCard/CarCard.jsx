import css from "./CarCard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectFavorites } from "../../redux/cars/selectors";
import { removeFromFavorites, addToFavorites } from "../../redux/cars/slice";
import Button from "../Button/Button";

export default function CarCard({ car }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(car.id);
  const navigate = useNavigate();

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(car.id));
    } else {
      dispatch(addToFavorites(car.id));
    }
  };

  const address = car.address.split(",");
  const handleBtnMore = (id) => {
    navigate(`/catalog/${id}`);
  };

  return (
    <div className={css.containerCard}>
      <div>
        <div className={css.containerImg}>
          <img className={css.img} src={car.img} alt={car.description} />
          <button className={css.btn} onClick={toggleFavorite}>
            {isFavorite ? (
              <svg className={css.icon} width="16" height="15">
                <use href="/sprite.svg#icon-favorites" />
              </svg>
            ) : (
              <svg className={css.icon} width="16" height="15">
                <use href="/sprite.svg#icon-isfavorites" />
              </svg>
            )}
          </button>
        </div>
        <div className={css.containerTitle}>
          <h3 className={css.cardTitle}>
            {car.brand} <span className={css.cardModel}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <p className={css.cardPrice}>${car.rentalPrice}</p>
        </div>
        <p className={css.cardText}>
          {address[1]?.trim()}
          <span className={css.line}></span>
          {address[2]?.trim()}
          <span className={css.line}></span>
          {car.rentalCompany}
          <span className={css.line}></span>
        </p>
        <p className={css.cardTextType}>
          {car.type.charAt(0).toUpperCase() + car.type.slice(1).toLowerCase()}
          <span className={css.line}></span>
          {car.mileage.toLocaleString("fr-FR")} km
          <span className={css.line}></span>
        </p>
      </div>
      <Button
        variant="primary"
        className={css.btnReadMore}
        onClick={(e) => handleBtnMore(car.id, e)}
      >
        Read more
      </Button>
    </div>
  );
}
