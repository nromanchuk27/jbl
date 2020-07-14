import { GET_MEDICINES, ITEM_WAS_SET, CHANGE_MODAL_STATUS, ITEM_WAS_DELETED, ITEM_WAS_UPDATED } from "./types.js";

import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const COLLECTION_NAME = "medicines_romanchuk";

export const setMedicineData = data => (dispatch, _, { getFirestore }) => {
  const db = getFirestore();
  data.id = uuidv4();

  db.collection(COLLECTION_NAME)
    .add(data)
    .then(doc => {
      dispatch({ type: ITEM_WAS_SET, payload: { ...data, docID: doc.id } });
      toast.success("Item was successfully created!");
    })
    .catch(function (error) {
      console.error("Error adding item: ", error);
      toast.err("Something went wrong! Item wasn't created");
    });
};

export const updateData = data => (dispatch, _, { getFirestore }) => {
  const db = getFirestore();

  db.collection(COLLECTION_NAME)
    .doc(data.docID)
    .update(data)
    .then(() => {
      dispatch({ type: ITEM_WAS_UPDATED, payload: data });
      toast.success("Item was successfully edited!");
    })
    .catch(error => {
      console.error("Error changing document ", error);
      toast.err("Something went wrong! Item wasn't edited");
    });
};

export const deleteItem = id => (dispatch, _, { getFirestore }) => {
  const db = getFirestore();

  db.collection(COLLECTION_NAME)
    .doc(id)
    .delete()
    .then(() => {
      dispatch({ type: ITEM_WAS_DELETED, payload: id });
      toast.success("Item was successfully deleted!");
    })
    .catch(error => {
      console.error("Error removing document: ", error);
      toast.err("Something went wrong! Item wasn't deleted");
    });
};

export const getMedicines = () => (dispatch, _, { getFirestore }) => {
  const db = getFirestore();
  db.collection(COLLECTION_NAME)
    .get()
    .then(querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => {
        const parsedData = doc.data();
        parsedData.price = Number(parsedData.price);
        parsedData.shelfLife = Number(parsedData.shelfLife);
        data.push({ ...parsedData, docID: doc.id });
      });
      dispatch({ type: GET_MEDICINES, payload: data });
    })
    .catch(err => {
      console.error("Error in getting document: ", err);
      toast.err("Something went wrong! Please try again!");
    });
};

export const changeModalStatus = (type, param) => {
  return { type: CHANGE_MODAL_STATUS, payload: { type, param } };
};
