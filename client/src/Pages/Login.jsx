import axios from "axios"
import React, { useState } from "react"
import toast from "react-hot-toast";
import {useAuth} from "../Context/auth"
export default function Login() {
    const [loginFormData, setLoginFormData] = React.useState({ username: "", password: "" })
    const [password, setPassword] = useState("");
    const [username,setUsername]=useState("")
    const [auth,setAuth]=useAuth()
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const res=await axios.post(`${process.env.REACT_APP_API}/auth/token/login/`,{username:loginFormData.username,password:loginFormData.password}, { withCredentials: true })
            if(res.status===200)
            {
            toast.success("Logged in Successfully", { duration: 5000 });
            setAuth({
              ...auth,
              token: res.data.auth_token,
            });
            //console.log(res.data.auth_token)
            const authToken = res.data.auth_token;
            console.log(auth)
            localStorage.setItem("auth",authToken);
            }
        } catch (error) {
            toast.error('Something went wrong')
            console.log(error.message)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="username"
                    onChange={handleChange}
                    type="text"
                    placeholder="Username"
                    value={loginFormData.email}
                />
                <input
                    name="password"
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    value={loginFormData.password}
                />
                <button>Log in</button>
            </form>
        </div>
    )

}