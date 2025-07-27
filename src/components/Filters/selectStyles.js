export const getCustomStyles = ({ menuHeight = 272 } = {}) => ({
  control: (provided) => ({
    ...provided,
    borderRadius: 12,
    padding: "0 16px",
    width: 204,
    height: 44,
    borderColor: "#f7f7f7",
    boxShadow: "none",
    outline: "none",
    backgroundColor: "#f7f7f7",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1.25,
    color: "#101828",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      borderColor: "#f7f7f7",
    },
    "&:focus": {
      borderColor: "#f7f7f7",
    },
    "&:focus-visible": {
      outline: "none",
    },
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#101828",
  }),

  menuList: (provided) => ({
    ...provided,
    maxHeight: menuHeight,
    borderRadius: 12,
    overflowY: "auto",
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: "#f7f7f7",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f7f7f7",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#dadde1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-button": {
      display: "none",
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#dadde1 #f7f7f7",
  }),

  menu: (provided) => ({
    ...provided,
    borderRadius: 12,
    width: 204,
    boxShadow: "0 4px 36px rgba(0, 0, 0, 0.02)",
    overflow: "hidden",
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#f7f7f7",
    paddingRight: 8,
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: "#f7f7f7",
    color: state.isSelected ? "#101828" : "#8d929a",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1.25,
    padding: "12px 16px",
    cursor: "pointer",
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    paddingRight: 8,
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 0,
    color: "#101828",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#101828",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 1.25,
  }),
  indicatorSeparator: () => null,
});
