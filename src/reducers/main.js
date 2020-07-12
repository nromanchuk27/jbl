import { GET_MEDICINES, CHANGE_MODAL_STATUS, ITEM_WAS_DELETED, ITEM_WAS_UPDATED, ITEM_WAS_SET } from "../actions/types";

const INITIAL_STATE = {
  medicineList: [],
  ERROR_GETTING: false,
  showMainModal: false,
  showDeleteModal: false,
  modalParam: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ITEM_WAS_SET: {
      return {
        ...state,
        medicineList: [payload, ...state.medicineList],
        showMainModal: false
      };
    }
    case ITEM_WAS_UPDATED: {
      const generate = () => {
        const newArr = state.medicineList.map(item => {
          if (item.docID === payload.docID) {
            for (const key in item) {
              item[key] = payload[key];
            }
          }
          return item;
        });
        return newArr;
      };
      return {
        ...state,
        showMainModal: false,
        medicineList: generate()
      };
    }
    case ITEM_WAS_DELETED: {
      console.log(payload, "payload ");
      return {
        ...state,
        medicineList: state.medicineList.filter(item => item.docID !== payload),
        showDeleteModal: false
      };
    }
    case CHANGE_MODAL_STATUS: {
      const { type, param } = payload;
      const key = type === "main" ? "showMainModal" : "showDeleteModal";
      return {
        ...state,
        [key]: !state[key],
        modalParam: param
      };
    }
    case GET_MEDICINES: {
      return {
        ...state,
        medicineList: payload
      };
    }

    default:
      return state;
  }
};
