import axios from "axios"
import React from "react"
import { useSearchParams } from "react-router-dom"

export default function Login() {
    let [searchParams, setSearchParams] = useSearchParams();
    let warning = searchParams.get("message");

    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })

    async function handleSubmit(e) {
        e.preventDefault()
        //const res=await axios.post(`${process.env.REACT_APP_API}/auth/token/login/`,{username:username,password:password}, { withCredentials: true })
        console.log(loginFormData)
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
            {warning ? <h4 className="warning">{warning}</h4> : null}
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Email address"
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