import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMedicines, changeModalStatus } from "./actions";
import { isEmpty } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "react-toastify";

import Loader from "react-loader-spinner";

import Error from "./components/Error"; // TODO: change name
import MedicineItem from "./components/MedicineItem";

import MainModal from "./components/modals/MainModal";
import DeleteModal from "./components/modals/DeleteModal";

import locale from "./assets/locale.json";
import { ReactComponent as AddSVG } from "./assets/svg/add.svg";

const App = () => {
  const dispatch = useDispatch();
  const { medicineList, gettingError, showMainModal, showDeleteModal } = useSelector(state => state.main);

  useEffect(() => {
    dispatch(getMedicines());
  }, [dispatch]);

  const openAddModal = () => {
    dispatch(changeModalStatus("main", { mode: "add" }));
  };

  if (!medicineList && !gettingError) {
    return <Loader type="TailSpin" color="#00BFFF" height={80} width={80} className="med_center" />;
  }

  if (gettingError) return <Error errorText={locale.gettingError} />;

  return (
    <div className="med__container">
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable={false}
      />
      {isEmpty(medicineList) && <div className="med_center">{locale.LIST_IS_EMPTY}</div>}
      {(showMainModal || showDeleteModal) && (
        <div className="med__modal">
          {showMainModal && <MainModal />}
          {showDeleteModal && <DeleteModal />}
        </div>
      )}
      {!isEmpty(medicineList) && (
        <div className="med__item med__item_header">
          <div className="med__item-info">
            <div className="med__item-header">{locale.HEADER__NAME}</div>
            <div className="med__item-header">{locale.HEADER__CODE}</div>
            <div className="med__item-header">{locale.HEADER__PRICE}</div>
          </div>
        </div>
      )}
      {medicineList.map(item => (
        <MedicineItem data={item} key={uuidv4()} />
      ))}
      <div className="med__add">
        <div className="med__add-button" onClick={openAddModal}>
          <AddSVG />
        </div>
      </div>
    </div>
  );
};

export default App;
