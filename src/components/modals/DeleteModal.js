import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import locale from "../../assets/locale.json";
import { changeModalStatus, deleteItem } from "../../actions";

const DeleteModal = props => {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const {
    modalParam: { id }
  } = useSelector(state => state.main);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(changeModalStatus("delete"));
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const deleteItemClick = () => {
    dispatch(deleteItem(id));
  };
  const cancelClick = () => {
    dispatch(changeModalStatus("delete"));
  };

  return (
    <div className="med__modal-container med__modal-container_delete" ref={modalRef}>
      <div className="med__modal-title">{locale.DELETE_MODAL__TITLE}</div>
      <div className="med__modal-control">
        <div className="med__button" onClick={cancelClick}>
          {locale.BUTTON_CANCEL}
        </div>
        <div className="med__button med__button_red" onClick={deleteItemClick}>
          {locale.BUTTON_DELETE}
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
