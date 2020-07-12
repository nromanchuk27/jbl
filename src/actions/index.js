import { GET_MEDICINES, ITEM_WAS_SET, CHANGE_MODAL_STATUS, ITEM_WAS_DELETED, ITEM_WAS_UPDATED } from "./types.js";
import { v4 as uuidv4 } from "uuid";

const COLLECTION_NAME = "medicines_romanchuk";

export const setMedicineData = data => (dispatch, _, { getFirestore }) => {
  const db = getFirestore();
  data.id = uuidv4();

  db.collection(COLLECTION_NAME)
    .add(data)
    .then(doc => {
      console.log("Document written with ID: ", doc.id);
      dispatch({ type: ITEM_WAS_SET, payload: { ...data, docID: doc.id } });
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
};

export const updateData = data => (dispatch, _, { getFirestore }) => {
  const db = getFirestore();

  // TODO CHANGE CODE IN THE BOTTOM
  /* SvPJCXAGdCfKv6SVOT8H */
  db.collection(COLLECTION_NAME)
    .doc(data.docID)
    .update(data)
    .then(() => {
      dispatch({ type: ITEM_WAS_UPDATED, payload: data });
    })
    .catch(error => {
      console.error("Error changing document ", error);
    });
};

export const deleteItem = id => (dispatch, getState, { getFirestore }) => {
  const db = getFirestore();

  // TODO CHANGE CODE ID LOGIC FROM GET STATE
  db.collection(COLLECTION_NAME)
    .doc(id)
    .delete()
    .then(() => {
      dispatch({ type: ITEM_WAS_DELETED, payload: id });
      console.log("Document successfully deleted!");
    })
    .catch(error => {
      console.error("Error removing document: ", error);
    });
};

export const getMedicines = () => (dispatch, _, { getFirestore }) => {
  const db = getFirestore();
  db.collection(COLLECTION_NAME)
    .get()
    .then(querySnapshot => {
      const data = [];
      querySnapshot.forEach(doc => {
        console.log(doc.id, "< ID");
        /* doc.ref.delete(); */
        data.push({ ...doc.data(), docID: doc.id });
      });
      dispatch({ type: GET_MEDICINES, payload: data });
    });
};

export const changeModalStatus = (type, param) => {
  return { type: CHANGE_MODAL_STATUS, payload: { type, param } };
};
