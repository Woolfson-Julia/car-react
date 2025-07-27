import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { selectAllPrices, selectBrands } from "../../redux/cars/selectors";
import { fetchBrands } from "../../redux/cars/operations";

import css from "./Filters.module.css";
import Button from "../Button/Button";
import Select from "react-select";
import IconDown from "../IconDown/IconDown";
import { getCustomStyles } from "./selectStyles";

export default function CarFilters({ onChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const brands = useSelector(selectBrands);
  const allPrices = useSelector(selectAllPrices);

  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [fromMileage, setFromMileage] = useState("");
  const [toMileage, setToMileage] = useState("");

  // Загрузка брендов при монтировании
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  // Синхронизация стейтов с параметрами URL при изменении URL
  useEffect(() => {
    setBrand(searchParams.get("brand") || "");
    setPrice(searchParams.get("price") || "");
    setFromMileage(searchParams.get("minMileage") || "");
    setToMileage(searchParams.get("maxMileage") || "");
  }, [searchParams]);

  // Генерация диапазона цен
  const minPrice = allPrices.length ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length ? Math.max(...allPrices) : 0;

  function generatePriceRange(min, max, step) {
    const range = [];
    for (let p = Math.ceil(min / step) * step; p <= max; p += step) {
      range.push(p);
    }
    return range;
  }

  const step = 10;
  const priceOptions = generatePriceRange(minPrice, maxPrice, step).map(
    (p) => ({
      value: p,
      label: p,
    })
  );

  const brandOptions = [
    { value: "", label: "All Brands" },
    ...brands.map((b) => ({ value: b, label: b })),
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (brand) params.set("brand", brand);
    if (price) params.set("price", price);
    if (fromMileage) params.set("minMileage", fromMileage);
    if (toMileage) params.set("maxMileage", toMileage);

    navigate({ pathname: "/catalog", search: params.toString() });

    onChange({ brand, price, fromMileage, toMileage });
  };

  // Чистим inputы, оставляя только цифры
  const cleanNumberInput = (value) => value.replace(/[^\d]/g, "");

    return (
      <div className={css.container}>
        <form className={css.filtersForm}>
          <label className={css.label}>
            Car brand
            <div className={css.containerSelect}>
              <Select
                components={{
                  DropdownIndicator: IconDown,
                }}
                options={brandOptions}
                styles={getCustomStyles({ menuHeight: 272 })}
                value={brand ? { value: brand, label: brand } : null}
                onChange={(selected) => setBrand(selected?.value || "")}
                placeholder="Choose a brand"
              />
            </div>
          </label>
          <label className={css.label}>
            Price/ 1 hour
            <div className={css.containerSelect}>
              <Select
                options={priceOptions}
                value={price ? { value: price, label: `To $${price}` } : null}
                onChange={(selected) => setPrice(selected?.value || "")}
                placeholder="Max price"
                components={{ DropdownIndicator: IconDown }}
                styles={getCustomStyles({ menuHeight: 188 })}
              />
            </div>
          </label>
          <label className={css.labelInput}>
            Сar mileage / km
            <div className={css.containerInput}>
              <input
                className={css.inputLeft}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                placeholder="From"
                value={
                  fromMileage
                    ? `From ${Number(fromMileage).toLocaleString("en-US")}`
                    : ""
                }
                onChange={(e) =>
                  setFromMileage(cleanNumberInput(e.target.value))
                }
                onBlur={(e) => setFromMileage(cleanNumberInput(e.target.value))}
              />
              <input
                className={css.input}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                placeholder="To"
                value={
                  toMileage
                    ? `To ${Number(toMileage).toLocaleString("en-US")}`
                    : ""
                }
                onChange={(e) => setToMileage(cleanNumberInput(e.target.value))}
                onBlur={(e) => setToMileage(cleanNumberInput(e.target.value))}
              />
            </div>
          </label>
        </form>
        <Button variant="primary" className={css.btn} onClick={handleSearch}>
          Search
        </Button>
      </div>
    );
}