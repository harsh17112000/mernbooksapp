import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { LoginContext } from './contextProvider/Context';

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    });
  

    const history = useNavigate();
    const {account,setAccount} = useContext(LoginContext);

 

    const getdata = (e) => {
        const { name, value } = e.target;


        setData(() => {
            return {
                ...data,
                [name]: value
            }
        })
    };


    const loginUser = async (e) => {
        e.preventDefault();

        const { email, password } = data;

        if (!email) {
            alert("email is required")
        } else if (!email.includes("@")) {
            alert("Enter valid email address")
        } else if (!password) {
            alert("password is required")
        } else {

            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    email, password
                })
            });

            const data1 = await res.json();
         

            if (res.status === 422 || !data1) {
                alert("invalid details")
            }
             else {
                history("/dash");
                setAccount(data1)
                setData({ ...data,  email: "", password: "" });
            }
            
        }

    }

    return (
        <>
     
            <div style={{ display: "flex", justifyContent: "center", marginTop: 20, Width: "100%" }}>
                <form className="form_style" method='POST' style={{ display: "flex", justifyContent: "center",width:600,padding:14, flexDirection: "column", height: 400 }}>
                    <h2>SignIn</h2>
                    <TextField
                        value={data.email} onChange={getdata}
                        name="email" style={{ width: "100%", marginTop: 20 }}  id="standard-basic" type="email" placeholder='User email' variant="standard" />

                    <TextField
                        value={data.password} type="password" name="password" style={{ width: "100%", marginTop: 20 }}  onChange={getdata}
                        id="standard-basic" placeholder='password' variant="standard" />
                    <Button variant="contained" color="primary" style={{ marginTop: 20, width: "100%", height: 40 }} onClick={loginUser}>
                        Submit
                    </Button>
                    <p style={{ marginTop: 10 }}>New User &nbsp;<NavLink to="/register" >Register</NavLink></p>

                </form>
            </div>
        </>
    )
}

export default Login