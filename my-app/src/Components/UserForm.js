import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const UserForm = ({ values, touched, errors, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
      console.log("status has changed!", status);
      status && setUsers(users => [...users, status]);
    }, [status]);
    return (
      <div className="user-form">
        <Form>
          <label htmlFor="name">
            {" "}
            Name
            <Field
              id="name"
              type="text"
              name="name"
              placeholder="name"
            />
             {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
          </label>
          <label htmlFor="Email">Email:</label>
          <Field id="Email" type="text" name="Email" placeholder="Email" />
          {touched.Email && errors.Email && <p className="errors">{errors.Email}</p>}

          <label htmlFor="Password">Password:</label>
          <Field id="Password" type="text" name="Password" placeholder="Password" />
          {touched.Password && errors.Password && <p className="errors">{errors.Password}</p>}

          <label htmlFor="Terms" className="checkbox-container">
          Terms Of Service
          <Field
            id="Terms"
            type="checkbox"
            name="Terms"
            checked={values.Terms}
          />
          <span className="checkmark" />
        </label>
          <button>Submit!</button>
        </Form>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      {users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.Email}</li>
          <li>Password: {user.Password}</li>
        </ul>
      ))}
      </div>
    );
  };
  // super component   // printer   //paper
  const FormikUserForm = withFormik({
    mapPropsToValues({ name, Email, Password, Terms }) {
      return {
        name: name || "",
        Email: Email || "",
        Password: Password || "",
        Terms: Terms || ""
      };
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      Password: Yup.string().required(),
    }),
    handleSubmit(values, { setStatus, resetForm }) {
      console.log("submitting", values);
      axios.post("https://reqres.in/api/users/", values).then(response => {
        console.log("success", response);
        setStatus(response.data);
        resetForm();
      });
    }
  })(UserForm);
  export default FormikUserForm;
  