// eslint-disable-next-line no-unused-vars
import React from 'react'

import FormRegister from './FormRegister'

const Register = () => {
  if(localStorage.getItem("TOKEN")!=null){
    window.location.replace("/home")
}
  return (
    
      <FormRegister />
    
    
  )
}

export default Register