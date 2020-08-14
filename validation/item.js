const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = {
  itemValidation: (data) => {
    let errors = {};
    let values = {};
    const { type } = data;
    switch (type) {
      case "food":
        {
          const { name, description, weight } = data;
          if (!name || !description || !weight) {
            errors.fieldError = "Empty Item Field";
          } else {
            values = { type, name, description, weight };
          }
        }
        break;
      case "drink":
        {
          const { name, volume } = data;
          if (!name || !volume) {
            errors.fieldError = "Empty Item Field";
          } else {
            values = { type, name, volume };
          }
        }
        break;
      default:
        errors.typeError = "Item Type Error";
        break;
    }

    return {
      errors,
      values,
      isValid: isEmpty(errors),
    };
  },
};
