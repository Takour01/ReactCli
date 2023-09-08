import { useFormik } from "formik";
import * as Yup from "yup";

const useCustomFormik = (initialValues, validationSchema, submitHandler) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      submitHandler(values);
    },
  });

  return formik;
};

export default useCustomFormik;
