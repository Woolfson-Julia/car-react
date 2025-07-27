import css from "./CarViewPage.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchCarById } from "../../redux/cars/operations";
import {
  selectCurrentCar,
  selectCarsLoading,
} from "../../redux/cars/selectors";
import ToastInfo from "../../components/ToastInfo/ToastInfo";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

export default function CarViewPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const car = useSelector(selectCurrentCar);
  const loading = useSelector(selectCarsLoading);


  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id));
    }
  }, [dispatch, id]);


  if (!car) {
    return <p>The car was not found.</p>;
  }

  const address = car.address.split(",");
  
  const initialValues = {
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    bookingDate: Yup.string(),
    comment: Yup.string(),
  });
  const handleSubmit = (values, { resetForm }) => {
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      ...values,
      createdAt: new Date().toISOString(),
    };

    existingBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    toast.success("Booking successful!");
    resetForm();
  };

  return (
    <section className="section">
      {loading ? <Loader /> : (
        <div className="container">
          <div className={css.containerCarPage}>
            <div className={css.containerImgForm}>
              <div className={css.containerImg}>
                <img className={css.img} src={car.img} alt={car.description} />
              </div>

              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <Form noValidate className={css.form}>
                  <div className={css.formContainer}>
                    <h3 className={css.formTitle}>Book your car now</h3>
                    <p className={css.formText}>
                      Stay connected! We are always ready to help you.
                    </p>
                    <div className={css.inputContainer}>
                      <Field
                        className={css.input}
                        name="name"
                        placeholder="Name*"
                      />
                      <ErrorMessage
                        className={css.error}
                        name="name"
                        component="div"
                      />
                    </div>
                    <div className={css.inputContainer}>
                      <Field
                        className={css.input}
                        name="email"
                        type="email"
                        placeholder="Email*"
                      />
                      <ErrorMessage
                        className={css.error}
                        name="email"
                        component="div"
                      />
                    </div>
                    <div className={css.inputContainer}>
                      <Field name="bookingDate">
                        {({ field, form }) => (
                          <DatePicker
                            className={css.input} // твой класс без иконки
                            selected={
                              field.value ? new Date(field.value) : null
                            }
                            onChange={(val) =>
                              form.setFieldValue("bookingDate", val)
                            }
                            placeholderText="Booking date"
                            dateFormat="yyyy-MM-dd"
                            calendarClassName={css.customCalendar}
                            showPopperArrow={true}
                            popperPlacement="bottom-end"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="bookingDate"
                        component="div"
                        className={css.error}
                      />
                    </div>
                    <div className={css.inputContainer}>
                      <Field
                        className={css.textarea}
                        as="textarea"
                        name="comment"
                        placeholder="Comment"
                      />
                      <ErrorMessage name="comment" component="div" />
                    </div>
                  </div>
                  <Button className={css.btn} variant="primary" type="submit">
                    Send
                  </Button>
                </Form>
              </Formik>
            </div>
            <div className={css.containerContent}>
              <div className={css.containerTitle}>
                <h3 className={css.cardTitle}>
                  {car.brand} {car.model}, {car.year}
                </h3>
                <p className={css.titleId}>
                  Id: {car.img.match(/\/(\d+)-ai\.jpg$/)?.[1]}
                </p>
              </div>
              <div className={css.containerText}>
                <div className={css.location}>
                  <svg className={css.icon} width="16" height="16">
                    <use href="/sprite.svg#icon-location" />
                  </svg>
                  <p className={css.text}>
                    {" "}
                    {address[1]?.trim()}, {address[2]?.trim()}
                  </p>
                </div>
                <p className={css.text}>
                  Mileage: {car.mileage.toLocaleString("fr-FR")} km
                </p>
              </div>
              <p className={css.cardPrice}>${car.rentalPrice}</p>
              <p className={css.textLast}>{car.description}</p>
              <div>
                <h3 className={css.titleList}>Rental Conditions:</h3>
                <ul className={css.list}>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                    {car.rentalConditions[0]}
                  </li>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                    {car.rentalConditions[1]}
                  </li>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                    {car.rentalConditions[2]}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className={css.titleList}>Car Specifications:</h3>
                <ul className={css.list}>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-calendar" />
                    </svg>
                    Year: {car.year}
                  </li>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-car" />
                    </svg>
                    Type:{" "}
                    {car.type.charAt(0).toUpperCase() +
                      car.type.slice(1).toLowerCase()}
                  </li>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-gas" />
                    </svg>
                    Fuel Consumption: {car.fuelConsumption}
                  </li>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-setting" />
                    </svg>
                    Engine Size: {car.engineSize}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className={css.titleList}>
                  Accessories and functionalities:
                </h3>
                <ul className={css.listLast}>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                    {car.accessories[0]}
                  </li>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                    {car.accessories[1]}
                  </li>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                    {car.accessories[2]}
                  </li>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                    {car.functionalities[0]}
                  </li>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                    {car.functionalities[1]}
                  </li>
                  <li className={css.item}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/sprite.svg#icon-check" />
                    </svg>
                    {car.functionalities[2]}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>)}

      <ToastInfo />
    </section>
  );
}
