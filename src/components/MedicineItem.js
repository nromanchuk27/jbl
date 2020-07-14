import React from "react";
import { useDispatch } from "react-redux";
import locale from "../assets/locale.json";
import { changeModalStatus } from "../actions";

const MedicineItem = props => {
  const dispatch = useDispatch();
  const { code, docID, name, price } = props.data;

  const openModal = (type, param) => {
    dispatch(changeModalStatus(type, param));
  };

  return (
    <div className="med__item" onDoubleClick={() => openModal("main", { mode: "edit", id: docID })}>
      <div className="med__item-info">
        <div className="med__item-value">{code}</div>
        <div className="med__item-value">{name}</div>
        <div className="med__item-value">{price}</div>
      </div>
      <div className="med__item-control">
        <div className="med__button med__item-button" onClick={() => openModal("main", { mode: "edit", id: docID })}>
          {locale.BUTTON_EDIT}
        </div>
        <div className="med__button med__item-button med__button_red" onClick={() => openModal("delete", { id: docID })}>
          {locale.BUTTON_DELETE}
        </div>
      </div>
    </div>
  );
};

export default MedicineItem;
