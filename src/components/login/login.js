import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useHistory,Link } from "react-router-dom"

const Login = () => {

    const history = useHistory()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9002/login", user)
        .then(res => {

            //setLoginUser(res.data.user)
            if(res.data.message === "login successfull")
           
            {history.push("/")}
            else
            {
                alert("Incorrect Username/Password");
            }
        })
    }

    return (
        <div className="login">
            <h1 style={{color:'black'}}>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>LOG IN</div>
            <div>or</div>
           <Link to="/register">
           <p> Create Account</p>
           </Link> 
        </div>
    )
}

export default Login