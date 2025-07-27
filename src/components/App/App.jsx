import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Loader/Loader";

const Layout = lazy(() => import("../Layout/Layout"));
const MainPage = lazy(() => import("../../pages/MainPage/MainPage"));
const CatalogPage = lazy(() => import("../../pages/CatalogPage/CatalogPage"));
const CarViewPage = lazy(() => import("../../pages/CarViewPage/CarViewPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<CarViewPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
