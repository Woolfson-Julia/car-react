import {
  selectCarsError,
  selectCarsLoading,
  selectCars,
} from "../../redux/cars/selectors";
import css from "./CarsList.module.css";
import CarCard from "../CarCard/CarCard";

import { genericErrorMessage } from "../../redux/cars/operations";
import { useSelector } from "react-redux";

export default function CarsList() {
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectCarsLoading);
  const isError = useSelector(selectCarsError);

  return (
    <div className="container">
      {!isLoading && isError && <p> {genericErrorMessage}</p>}
      {!isLoading && !isError && cars.length > 0 && (
        <ul className={css.cardList}>
          {cars.map((car) => (
            <li className={css.cardItem} key={car.id}>
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !isError && cars.length === 0 && (
        <p className={css.noResults}>No cars match your filters.</p>
      )}
    </div>
  );
}
