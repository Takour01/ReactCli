import { useEffect, useState } from "react";
import {
  checkObjectKeysInArray,
  TotalvalidateForm,
  validateForm,
} from "../constant";

const useFormValidation = (formData, validationRules) => {
  const [validationErrors, setValidationErrors] = useState({});
  const handleBlur = (event, field) => {
    if (event.target.id === field) {
      const errors = validateForm(formData, validationRules, field);
      setValidationErrors(errors);
    }
  };
  const handleErrors = (fields) => {
    const errors = TotalvalidateForm(formData, validationRules);
    setValidationErrors(errors);

    return !checkObjectKeysInArray(fields, errors);
  };

  return { handleBlur, validationErrors, handleErrors };
};

export default useFormValidation;
