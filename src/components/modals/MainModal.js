import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import locale from "../../assets/locale.json";
import { changeModalStatus, updateData, setMedicineData } from "../../actions";
import { ReactComponent as CloseSVG } from "../../assets/svg/close.svg";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";

const generateMessage = (from, to, str) => {
  return str.replace("{{from}}", from).replace("{{to}}", to);
};

const bigLengthRex = /^\w{0,2000}$/;

const MainModal = () => {
  const {
    modalParam: { id, mode },
    medicineList
  } = useSelector(state => state.main);
  const { handleSubmit, register, errors } = useForm({
    defaultValues: medicineList.find(item => item.docID === id) || {}
  });
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

  const onSubmit = data => {
    if (step > 1) {
      mode === "add" ? dispatch(setMedicineData(data)) : dispatch(updateData({ ...data, docID: id }));
    } else {
      changeStep();
    }
  };

  const changeStep = () => {
    setStep(step > 1 ? 1 : 2);
  };

  const closeModal = () => {
    dispatch(changeModalStatus("main"));
  };

  return (
    <div className="med__modal-container" ref={modalRef}>
      <div className="med__modal-close" onClick={closeModal}>
        <CloseSVG />
      </div>
      <div className="med__modal-title">
        <span>{mode === "add" ? locale.MAIN_MODAL__TITLE_ADD : locale.MAIN_MODAL__TITLE_EDIT}</span>
        <span>{`${step}/2`}</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={step < 2 ? "med__modal-content" : "med__modal-content_hide"}>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__CODE}</span>
            <div className="med__modal-wrapper">
              <input
                type="text"
                name="code"
                className="med__modal-inp"
                ref={register({
                  required: locale.MAIN_MODAL__REQUIRED,
                  pattern: {
                    value: /^\w{5,10}$/,
                    message: generateMessage(5, 10, locale.ERROR_VALIDATION_LENGTH)
                  }
                })}
              />
              <div className="med__modal-error">{errors.code && errors.code.message}</div>
            </div>
          </div>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__NAME}</span>
            <div className="med__modal-wrapper">
              <input
                type="text"
                name="name"
                className="med__modal-inp"
                ref={register({
                  required: locale.MAIN_MODAL__REQUIRED,
                  pattern: {
                    value: /^\w{5,100}$/,
                    message: generateMessage(5, 100, locale.ERROR_VALIDATION_LENGTH)
                  }
                })}
              />
              <div className="med__modal-error">{errors.name && errors.name.message}</div>
            </div>
          </div>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__PRICE}</span>
            <div className="med__modal-wrapper">
              <input
                name="price"
                className="med__modal-inp"
                ref={register({
                  required: locale.MAIN_MODAL__REQUIRED,
                  pattern: {
                    value: /^(?=.*[1-9])\d{0,6}(?:\.\d{0,2})?|100000$/,
                    message: generateMessage(0.01, 1000000, locale.ERROR_NUMBER)
                  }
                })}
              />
              <div className="med__modal-error">{errors.price && errors.price.message}</div>
            </div>
          </div>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__DATE}</span>
            <div className="med__modal-wrapper">
              <input
                name="shelfLife"
                className="med__modal-inp"
                ref={register({
                  required: locale.MAIN_MODAL__REQUIRED,
                  pattern: {
                    value: /(?:[1-9]|[1-9][0-9]{1,2}|1000)/,
                    message: generateMessage(1, 1000, locale.ERROR_NUMBER)
                  }
                })}
              />
              <div className="med__modal-error">{errors.shelfLife && errors.shelfLife.message}</div>
            </div>
          </div>
        </div>
        <div className={step > 1 ? "med__modal-content" : "med__modal-content_hide"}>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__COMPOSITION}</span>
            <div className="med__modal-wrapper">
              <textarea
                type="number"
                name="composition"
                className="med__modal-inp med__modal-inp_big"
                ref={register({
                  pattern: {
                    value: bigLengthRex,
                    message: generateMessage(0, 2000, locale.ERROR_VALIDATION_LENGTH)
                  }
                })}
              />
              <div className="med__modal-error">{errors.composition && errors.composition.message}</div>
            </div>
          </div>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__INDICATION}</span>
            <div className="med__modal-wrapper">
              <textarea
                type="text"
                name="indication"
                className="med__modal-inp med__modal-inp_big"
                ref={register({
                  pattern: {
                    value: bigLengthRex,
                    message: generateMessage(0, 2000, locale.ERROR_VALIDATION_LENGTH)
                  }
                })}
              />
              <div className="med__modal-error">{errors.indication && errors.indication.message}</div>
            </div>
          </div>
          <div className="med__modal-field">
            <span>{locale.MAIN_MODAL__CONTRAINDICATIONS}</span>
            <div className="med__modal-wrapper">
              <textarea
                type="text"
                name="сontraindications"
                className="med__modal-inp med__modal-inp_big"
                ref={register({
                  pattern: {
                    value: bigLengthRex,
                    message: generateMessage(0, 2000, locale.ERROR_VALIDATION_LENGTH)
                  }
                })}
              />
              <div className="med__modal-error">{errors.сontraindications && errors.сontraindications.message}</div>
            </div>
          </div>
        </div>

        <div className="med__modal-control">
          <div className="med__button med__button_red" onClick={closeModal}>
            {locale.BUTTON_CANCEL}
          </div>
          {step < 2 ? (
            <>
              <button className={isEmpty(errors) ? "med__button" : "med__button med__button_disabled"} onSubmit={onSubmit}>
                {locale.MAIN_MODAL__BUTTON_NEXT}
              </button>
            </>
          ) : (
            <>
              <div className="med__button" onClick={changeStep}>
                {locale.MAIN_MODAL__BUTTON_PREV}
              </div>

              <button
                className={isEmpty(errors) ? "med__button" : "med__button med__button_disabled"}
                type="submit"
                onSubmit={handleSubmit(onSubmit)}>
                {mode === "add" ? locale.MAIN_MODAL__BUTTON_CREATE : locale.MAIN_MODAL__BUTTON_EDIT}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default MainModal;
