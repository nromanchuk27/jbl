import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import locale from "../../assets/locale.json";
import { changeModalStatus, updateData, setMedicineData } from "../../actions";
import { ReactComponent as CloseSVG } from "../../assets/svg/close.svg";

const initialValue = {
  code: "",
  composition: "",
  docID: "",
  id: "",
  indication: "",
  name: "",
  price: "",
  shelfLife: "",
  сontraindications: ""
};

const MainModal = () => {
  const {
    modalParam: { id, mode },
    medicineList
  } = useSelector(state => state.main);

  const [data, setData] = useState(medicineList.find(item => item.docID === id) || initialValue);
  const [step, setStep] = useState(1);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(changeModalStatus("main"));
        document.removeEventListener("mousedown", handleClickOutside);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const changeStep = () => {
    setStep(step > 1 ? 1 : 2);
  };
  const closeModal = () => {
    dispatch(changeModalStatus("main"));
  };
  const submitClick = () => {
    mode === "add" ? dispatch(setMedicineData(data)) : dispatch(updateData(data));
  };

  const inputChange = event => {
    event.persist();
    setData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };
  console.log(mode, "mode");

  return (
    <div className="med__modal-container" ref={modalRef}>
      <div className="med__modal-close" onClick={closeModal}>
        <CloseSVG />
      </div>
      <div className="med__modal-title">
        <span>{mode === "add" ? locale.MAIN_MODAL__TITLE_ADD : locale.MAIN_MODAL__TITLE_EDIT}</span>
        <span>{`${step}/2`}</span>
      </div>

      {step == 1 ? (
        <>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__CODE}</span>
            <input type="text" name="code" className="med__modal-inp" value={data.code} onChange={inputChange} />
          </div>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__NAME}</span>
            <input type="text" name="name" className="med__modal-inp" value={data.name} onChange={e => inputChange(e)} />
          </div>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__PRICE}</span>
            <input type="text" name="price" className="med__modal-inp" value={data.price} onChange={inputChange} />
          </div>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__DATE}</span>
            <input type="text" name="shelfLife" className="med__modal-inp" value={data.shelfLife} onChange={inputChange} />
          </div>
        </>
      ) : (
        <>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__COMPOSITION}</span>
            <textarea
              type="text"
              name="composition"
              className="med__modal-inp med__modal-inp_big"
              value={data.composition}
              onChange={inputChange}
            />
          </div>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__INDICATION}</span>
            <textarea
              type="text"
              name="indication"
              className="med__modal-inp med__modal-inp_big"
              value={data.indication}
              onChange={inputChange}
            />
          </div>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__CONTRAINDICATIONS}</span>
            <textarea
              type="text"
              name="сontraindications"
              className="med__modal-inp med__modal-inp_big"
              value={data.сontraindications}
              onChange={inputChange}
            />
          </div>
        </>
      )}
      <div className="med__modal-control">
        <div className="med__button" onClick={closeModal}>
          {locale.BUTTON_CANCEL}
        </div>
        {step == 1 ? (
          <>
            <div className="med__button" onClick={changeStep}>
              {locale.MAIN_MODAL__BUTTON_NEXT}
            </div>
          </>
        ) : (
          <>
            <div className="med__button" onClick={changeStep}>
              {locale.MAIN_MODAL__BUTTON_PREV}
            </div>

            <div className="med__button" onClick={submitClick}>
              {mode === "add" ? locale.MAIN_MODAL__BUTTON_CREATE : locale.MAIN_MODAL__BUTTON_EDIT}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainModal;
