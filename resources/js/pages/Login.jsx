import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Login(){


const navigate = useNavigate();


const [form,setForm]=useState({

email:"",
password:""

});



const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};



const submit=async(e)=>{

e.preventDefault();


try{


const response = await axios.post(
"/api/login",
form
);



localStorage.setItem(

"token",

response.data.token

);



alert("Login successful");


navigate("/dashboard");



}
catch(error){


alert("Invalid email or password");


}


};



return (

<div className="min-h-screen flex items-center justify-center">


<div className="w-96 border p-6 rounded">


<h2 className="text-2xl mb-5">
Login
</h2>


<form onSubmit={submit}>


<input

className="border w-full p-2 mb-3"

type="email"

name="email"

placeholder="Email"

onChange={handleChange}

/>



<input

className="border w-full p-2 mb-3"

type="password"

name="password"

placeholder="Password"

onChange={handleChange}

/>



<button

className="bg-black text-white w-full p-2"

>

Login

</button>


</form>


</div>


</div>


)

}


export default Login;