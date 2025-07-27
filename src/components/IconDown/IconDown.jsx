import { components } from "react-select";

export default function IconDown(props) {
  const { menuIsOpen } = props.selectProps;
  return (
    <components.DropdownIndicator {...props}>
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 16,
          pointerEvents: "none",
        }}
      >
        <svg
          width="16"
          height="16"
          style={{
            fill: "#101828",
            transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
            transformOrigin: "center",
            transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <use href="/sprite.svg#icon-down" />
        </svg>
      </div>
    </components.DropdownIndicator>
  );
}
