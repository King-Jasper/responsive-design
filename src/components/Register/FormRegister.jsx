// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import preloader from '../images/preloader.gif'


import { Link } from "react-router-dom";
    
      import {CloseButton,Button,ContentTicketClass,TicketClassIn, ButtonForm, TicketContent,CenterDiv, Container, Fieldset, Form, FormDiv, Loader, Preloader } from "../Styled/Styled";
import { URL } from "../../utils/Utils";

const FormRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    agree: false,
    sectors: [],
    password: "",
    cpassword: "",
 
  });
  const [loading, setLoading] = useState(false);
  const [sectorsClass, setSectorsclass] = useState([]);
  let [x, setX] = useState(0);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [state, setState] = useState(false);

  const [arrays, setArrays] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      sectors: name === 'sectors' ? [value] : prevFormData.sectors,
    }));
  
    if (name === 'cpassword') {
      setPasswordMatch(value === formData.password);
    }

  
    if (value.length > 0) {
      console.log(formData.sectors)
      setState(true);
    }
  };
  
  
  const addSectors = () => {
    const newSectors = {
      id: x + 1,
      sectors: formData.sectors[0] 
    };
  
    setSectorsclass((prevTicketClasses) => [...prevTicketClasses, newSectors]);
    setX((prevX) => prevX + 1);
    setArrays((prevArrays) => [...prevArrays, newSectors]);
    setState(true);
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      sectors: [] 
    }));
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (formData.name.length < 3) {
      swal('ALERT', 'Name is required', 'error');
    }  else if (formData.password.length < 4) {
      swal('ALERT', 'Password must be at least 4 characters long', 'error');
    } else if (formData.password !== formData.cpassword) {
      swal('ALERT', 'Password does not match', 'error');
    } else {
      try {
        setLoading(true);
       
const data = {
  agree:formData.agree =="on" ? true : false, 
  password: formData.password,
  name: formData.name,
  sectors:formData.sectors

}
        const url = `${URL}register`;
        const response = await axios.post(url,  data);
        setLoading(false);
        console.log(formData)
   
        let message = response.data;
        console.log(message);
  
        if (message.role=="USER") {
          swal('ALERT!', 'Succesful', 'success');
          window.location.href="/"
        }
      } catch (err) {
        setLoading(false);
        console.log(err.response);
        if (err.response && err.response.data) {
        
          swal('ALERT', err.response.data.message, 'error');
        } else {
          swal('ALERT', 'Try Again Later', 'error');
        }
      }
    }
  }; 
  
  
  const handleTicketClassChange = (e, index) => {
    const sectors = [...sectorsClass];
    sectors[index].sectors = e.target.value;
    setSectorsclass(sectors);
    console.log(sectorsClass);
    setFormData((prevFormData) => ({
      ...prevFormData,
      sectors: sectors.map((sector) => sector.sectors),
    }));
    console.log(formData.sectors);
  };
  

  const removeDelete = (indexToRemove) => {
    const updateSectors = [...sectorsClass];
    updateSectors.splice(indexToRemove, 1);
    setSectorsclass(updateSectors);
  
    const updatedArrays = [...arrays];
    updatedArrays.splice(indexToRemove, 1);
    setArrays(updatedArrays);
  
    const update = formData.sectors.filter((item, index) => index !== indexToRemove);
    setFormData(prevFormData => ({
      ...prevFormData,
      sectors: update
    }));
  };

  return (
    

<Container>
{(loading) ?
<Preloader>
  <Loader src={preloader}></Loader>
</Preloader>

: null}
   <FormDiv>
    <Form onSubmit={handleSubmit}>
      <h3>Signup</h3>
     
  
      <Fieldset>
                <legend>Name</legend>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  placeholder="Name"
                />
              </Fieldset>

              <Button  type="button" required  onClick={addSectors}>
                  Add Sectors
                </Button>
                <h1></h1>
       
            
          
  {state && sectorsClass.length > 0 &&
  sectorsClass.map((item,i) => (
    <ul key={item.id} style={{ width: "100%", height: "auto" }}>
      <TicketContent>
        <ContentTicketClass>
          <TicketClassIn>
            <Fieldset>
              <legend>Sectors </legend>
              <input
                type="text"
                required
                placeholder="eg  Enter First Sectors"
                name="sectors"
                 value={item.sectors}
                onChange={(e) => handleTicketClassChange(e, i)}
                
              />
            </Fieldset>
          </TicketClassIn>
         
          <CloseButton onClick={() => removeDelete(i)}>x</CloseButton>
        </ContentTicketClass>
      </TicketContent>
    </ul>
  ))}
         
     
        <Fieldset>
          <legend>Password</legend>
          <input
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            placeholder="Password"
          />
        </Fieldset>
        <Fieldset>
                <legend>Confirm Password</legend>
                <input
                    type="password"
                    value={formData.cpassword}
                    onChange={handleChange}
                    name="cpassword"
                    placeholder="Confirm Password"
                />
                {!passwordMatch && <p className="error">***Passwords do not match***</p>}
              </Fieldset>
        <p>
        <input type="checkbox" name="agree" onChange={handleChange} checked={formData.agree} ></input><span>Terms and Conditions</span>
<br />
</p>

     



<ButtonForm>
  Create Account
</ButtonForm>
<CenterDiv>
  <p>Already Registered ? <Link to="/">Login</Link></p>
</CenterDiv>
    
    </Form>
  </FormDiv>
 

</Container>

  )
}

export default FormRegister;
