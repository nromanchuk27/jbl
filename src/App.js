import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMedicines, changeModalStatus } from "./actions";
import { isEmpty } from "lodash";
import { v4 as uuidv4 } from "uuid";

import Loader from "react-loader-spinner";

import Error from "./components/Error"; // TODO: change name
import MedicineItem from "./components/MedicineItem"; // TODO: change name

import MainModal from "./components/modals/MainModal";
import DeleteModal from "./components/modals/DeleteModal";

import locale from "./assets/locale.json";
import { ReactComponent as AddSVG } from "./assets/svg/add.svg";

const App = () => {
  const dispatch = useDispatch();
  const { medicineList, ERROR_GETTING, showMainModal, showDeleteModal } = useSelector(state => state.main);

  useEffect(() => {
    dispatch(getMedicines());
  }, []);

  console.log(medicineList, "medicineList");

  const openAddModal = () => {
    dispatch(changeModalStatus("main", { mode: "add" }));
  };

  if (isEmpty(medicineList) && !ERROR_GETTING) return <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />;

  if (ERROR_GETTING) return <Error errorText={locale.ERROR_GETTING} />;

  return (
    <div className="med__container">
      {(showMainModal || showDeleteModal) && (
        <div className="med__modal">
          {showMainModal && <MainModal />}
          {showDeleteModal && <DeleteModal />}
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
