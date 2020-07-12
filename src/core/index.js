import locale from "../assets/locale.json";
import { unmountComponentAtNode } from "react-dom";

export const closeModal = id => {
  const modal = document.getElementById(id);
  unmountComponentAtNode(modal);
  document.body.removeChild(modal);
};

const rules = {
  code: {
    from: 5,
    to: 10,
    type: "string"
  },
  name: {
    from: 5,
    to: 100,
    type: "string"
  },
  price: {
    from: 0.01,
    to: 1000000,
    type: "number"
  },
  shelfLife: {
    from: 1,
    to: 1000,
    type: "number"
  },
  compositionAndFormOfRelease: {
    from: 0,
    to: 2000,
    type: "string"
  },
  indication: {
    from: 0,
    to: 2000,
    type: "string"
  },
  сontraindications: {
    from: 0,
    to: 2000,
    type: "string"
  }
};

const generateMessage = (from, to) => {
  return locale.ERROR_VALIDATION_LENGTH.replace("{{from}}", from).replace("{{to}}", to);
};

export const validation = (value, type) => {
  const result = {
    message: "",
    valid: true
  };
  if (typeof value !== rules[type].type) {
    return {
      valid: false,
      message: rules[type].type === "string" ? locale.ERROR_VALIDATION_STRING : locale.ERROR_VALIDATION_NUMBER
    };
  }

  if (value.length < rules[type].from || value.length > rules[type].to) {
    return {
      valid: false,
      message: generateMessage(rules[type].from, rules[type].to)
    };
  }

  return result;
};
