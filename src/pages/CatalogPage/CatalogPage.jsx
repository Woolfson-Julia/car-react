import css from "./CatalogPage.module.css";


import { useEffect } from "react";
import {useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../redux/cars/operations";

import Filter from "../../components/Filters/Filters";
import CarsList from "../../components/CarsList/CarsList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn"
import { setPage, setFilters } from "../../redux/cars/slice";
import {
  selectPage,
  selectCars,
  selectTotalPage,
  selectFilters,
  selectCarsLoading,
} from "../../redux/cars/selectors";
import Loader from "../../components/Loader/Loader";


export default function CatalogPage() {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const cars = useSelector(selectCars);
  const filters = useSelector(selectFilters);
  const totalPages = useSelector(selectTotalPage);
  const loading = useSelector(selectCarsLoading);

  useEffect(() => {
    dispatch(fetchCars({ page, filters }));
  }, [filters, page, dispatch]);

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      dispatch(setPage(page + 1));
    }
  };
const onFilterChange = (newFilters) => {
  dispatch(setFilters(newFilters));
};

  return (
    <section className="section">
      <div className={css.containerCatalog}>
        <Filter onChange={onFilterChange} currentFilters={filters} />
        <CarsList cars={cars} />
        {page < totalPages && !loading && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}

        {loading && <Loader/>}
      </div>
    </section>
  );
}
