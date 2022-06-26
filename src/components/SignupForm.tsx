import React from "react";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import classes from "./singup.module.css";
import { useState } from "react";

const SingupForm: React.FC<FormikValues> = (props) => {
  const [form, setForm] = useState(false);

  const handler = () => {
    setForm(true);
  };

  const backHandler = () => {
    setForm(false);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema: yup.object({
      firstName: yup
        .string()
        .max(15, "Must be 15 characters or less")
        .required("Required")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
      lastName: yup
        .string()
        .max(20, "Must be 20 characters or less")
        .required("Required")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
      email: yup.string().email("Invalid email address").required("Required"),
      phone: yup
        .string()
        .max(10, "Must be lower than 50 characters")
        .matches(/^[0-9]/, "Please insert a number"),
    }),
    onSubmit: (userData) => {
      props.adduser(userData);
      formik.values.firstName = "";
      formik.values.lastName = "";
      formik.values.email = "";
      formik.values.phone = "";
      setForm(false);
      //alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <div className={classes.register}>
        {!form ? "Registration step 1" : "Registration step 2"}
      </div>
      {form || (
        <React.Fragment>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          <div className={classes.errorcontainer}>
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className={classes.error}>{formik.errors.firstName}</div>
            ) : null}
          </div>

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          <div className={classes.errorcontainer}>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className={classes.error}>{formik.errors.lastName}</div>
            ) : null}
          </div>

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <div className={classes.errorcontainer}>
            {formik.touched.email && formik.errors.email ? (
              <div className={classes.error}>{formik.errors.email}</div>
            ) : null}
          </div>
          <button onClick={handler}>Next</button>
        </React.Fragment>
      )}

      {form && (
        <React.Fragment>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone.toString()}
          />
          <div className={classes.errorcontainer}>
            {formik.touched.phone && formik.errors.phone ? (
              <div className={classes.error}>{formik.errors.phone}</div>
            ) : null}
          </div>
          <button onClick={backHandler}>Back</button>
          <button type="submit" value="Reset">
            Submit
          </button>
        </React.Fragment>
      )}
    </form>
  );
};

export default SingupForm;
