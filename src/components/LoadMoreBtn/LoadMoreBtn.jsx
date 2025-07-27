import css from "./LoadMoreBtn.module.css";
import Button from "../Button/Button";

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={css.btnContainer}>
      <Button
        onClick={onClick}
        variant="outline"
        className={css.loadMoreBtn}
      >
        Load more
      </Button>
    </div>
  );
}
