import Form from "../components/form";




function Login(){
    return(<Form route="/api/token/" method="post" type="login"/>
   
    );
    
}

export default Login;
// Compare this snippet from frontend/src/components/LoginForm.jsx: