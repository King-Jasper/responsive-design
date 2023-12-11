


// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import preloader from '../images/preloader.gif'


import { Link } from "react-router-dom";
    
      import {ContentTicketClass,TicketClassIn, ButtonForm, TicketContent,CenterDiv, Container, Fieldset, Form, FormDiv, Loader, Preloader } from "../Styled/Styled";
import { TOKEN, URL } from "../../utils/Utils";

export default function Home() {
  console.log(TOKEN)
 
  const [formData, setFormData] = useState({
    name: "",
    agree: false,
    sectors: [],
    password: "",
 
  });
  const [loading, setLoading] = useState(false);
  const [sectorsClass, setSectorsClass] = useState([]);
  const [sectorClassPin,setSectorsClassuser]=useState([])



  const handleChange = (event) => {
    const { name, value } = event.target;

  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      sectors: name === 'sectors' ? [value] : prevFormData.sectors,
    }));
  

  
    if (value.length > 0) {
      console.log(formData.sectors)
    
    }
  };
const userDetailsString = localStorage.getItem("userDetails");
const userDetails = JSON.parse(userDetailsString);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${URL}getUser?userId=${userDetails.id}`;
        const response = await axios.get(
          url,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${TOKEN}`,
            },
          }
        );
        console.log(response.data);
        setSectorsClassuser(response.data.sectors);
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: response.data.name || '', 
          sectors: response.data.sectors || [], 
          agree: response.data.agree || false, 
        }));
       
      } catch (error) {
   
        console.error('Error:', error);
      }
    };

    fetchData(); 
  }, [userDetails.id]); 

  

  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (formData.name.length < 3) {
      swal('ALERT', 'Name is required', 'error');
    } else {
      try {
        setLoading(true);
       
const data = {
  agree:formData.agree, 
  password: formData.password,
  name: formData.name,
  sectors:formData.sectors

}
        const url = `${URL}update`;
        const response = await axios.put(url,  data,{
          headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`, 

          },
        }
          );
        setLoading(false);
        console.log(formData)
   
        let message = response.data;
        console.log(message);
  
        if (message.role=="USER") {
          swal('ALERT!', 'Update Succesfully Login with your new account', 'success');
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
  
  
  const handlesectorsChange = (e, index) => {
    const sectors = [...sectorsClass];
  
    // Make sure the sectors array has the necessary structure
    if (!sectors[index]) {
      sectors[index] = {};
    }
  
    // Update the value
    sectors[index].sectors = e.target.value;
    setSectorsClass(sectors);
    console.log(sectors);
  
    // Update the formData dynamically
    setFormData((prevFormData) => ({
      ...prevFormData,
      sectors: sectors.map((sector) => sector.sectors),
    }));
  };
  
  
  // ... rest of the code
  



  return (
    

<Container>
{(loading) ?
<Preloader>
  <Loader src={preloader}></Loader>
</Preloader>

: null}
   <FormDiv>
    <Form onSubmit={handleSubmit}>
      <h3>Update User Sectors</h3>
     
  
      <Fieldset>
            <legend>Name</legend>
            <input
              type="text"
              value={formData?.name }
              onChange={handleChange}
              name="name"
              placeholder="Name"
            />
          </Fieldset>


            
               
       
              {sectorClassPin.map((item, index) => (
            <ul key={index}>
              <TicketContent>
                <ContentTicketClass>
                  <TicketClassIn>
                    <Fieldset>
                      <legend>Sectors</legend>
                      <input
                        type="text"
                        name={`sector_${index}`}
                        value={formData.sectors[index] || ''}
                        onChange={(e) => handlesectorsChange(e, index)}
                      />
                    </Fieldset>
                  </TicketClassIn>
                </ContentTicketClass>
              </TicketContent>
            </ul>
          ))}
        {/* <Fieldset>
          <legend>Password</legend>
          <input
            type="password"
            value={user.password}
            onChange={handleChange}
            name="password"
            placeholder="Password"
          />
        </Fieldset> */}
   
        <p>
        <input type="checkbox" name="agree" onChange={handleChange}checked={formData?.agree}
></input><span>Terms and Conditions</span>
<br />
</p>

     



<ButtonForm>
  Update
</ButtonForm>
<CenterDiv>
 <Link to="/logout">Logout</Link>
</CenterDiv>
    
    </Form>
  </FormDiv>

    </Container>
  )
}

