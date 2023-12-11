
import LoginForm from "./LoginForm";

const Login = ()=>{
    if(localStorage.getItem("TOKEN")!=null){
        window.location.replace("/home")
    }
    return(
     
       
        <LoginForm />
      
       
    )

}
export default Login;