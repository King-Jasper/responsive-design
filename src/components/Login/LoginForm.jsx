// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import preloader from '../images/preloader.gif'
import { Link } from "react-router-dom";

import {  ButtonForm, CenterDiv, Container, Fieldset, Form, FormDiv, Loader, Preloader } from "../Styled/Styled";
import { URL } from "../../utils/Utils";




const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

if (!formData.name) {
      swal('ALERT', 'Invalid name', 'error');
    }   else {
      try {
        setLoading(true);

        const url = `${URL}login`;
        const response = await axios.post(url, formData);

        setLoading(false);

        const Token =response.data.jwt;
        const result =response.data;
       
        localStorage.setItem("TOKEN",Token)
        console.log(localStorage.getItem("TOKEN"))
        localStorage.setItem("userDetails",JSON.stringify(result))
        
         swal("ALERT","Succesful Create","success")
         window.location.href="/home"

        
      } catch (err) {
        setLoading(false);
        const message = err.response.data.message;
        console.log(err)
        swal("ALERT",message,"error")

  }
}
  }


  return (
    <Container>
      {(loading) ?
      <Preloader>
        <Loader src={preloader}></Loader>
      </Preloader>
      
      : null}
         <FormDiv>
          <Form onSubmit={handleSubmit}>
            <h3>Login to your account</h3>
        
              <Fieldset>
                <legend>Name</legend>
                <input
                  type="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  name="name"
                />
              </Fieldset>
              <Fieldset>
                <legend>Password</legend>
                <input
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  name="password"
                />
              </Fieldset>
             

            <ButtonForm>
              Login
            </ButtonForm>
            <CenterDiv>
              <p>Dont have an Account? <Link to="/signup">Register</Link></p>
            </CenterDiv>
           
          </Form>
        </FormDiv>
       

    </Container>

  )
}

export default LoginForm;