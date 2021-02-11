import { TextField } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";

const Form = () => {
  return (
    <div>
      <Formik
        initialValues={{ category: "" }}
        onSubmit={data => {
          console.log(data);
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
