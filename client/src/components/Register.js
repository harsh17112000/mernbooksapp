import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NavLink, useNavigate } from "react-router-dom"

const Register = () => {

    const [data, setData] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });
    

    const history = useNavigate();

    const getdata = (e) => {
        const { name, value } = e.target;


        setData(() => {
            return {
                ...data,
                [name]: value
            }
        })
    };


    const registerUser = async (e) => {
        e.preventDefault();


        const { fname, email, password, cpassword } = data;

        if (!fname) {
            alert("fname is required")
        } else if (!email) {
            alert("email is required")
        } else if (!email.includes("@")) {
            alert("Enter valid email address")
        } else if (!password) {
            alert("password is required")
        } else if (!cpassword) {
            alert("cpassword is required")
        } else if (password !== cpassword) {
            alert("password and cpassword are not matched")
        } else {
            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            const data1 = await res.json();

            if (res.status === 422 || !data1) {
                alert("invalid details")
            }else if(data1.email === email){
                alert("this user is already exist")
            }
             else {
                history("/")
                setData({ ...data, fname: "", email: "", password: "", cpassword: "" })
             
            }

        }
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 20, Width: "100%" }}>
                <form method='POST' style={{ display: "flex", justifyContent: "center", padding: 15, width: 600, flexDirection: "column", height: 400 }}>
                    <h2>Reister</h2>
                    <TextField
                        value={data.fname} onChange={getdata}
                        name="fname" style={{ width: "100%", marginTop: 20 }} id="standard-basic" type="text" placeholder='User Name' variant="standard" />

                    <TextField
                        value={data.email} onChange={getdata}
                        name="email" style={{ width: "100%", marginTop: 20 }} id="standard-basic" type="email" placeholder='User email' variant="standard" />

                    <TextField
                        value={data.password} type="password" name="password" style={{ width: "100%", marginTop: 20 }} onChange={getdata}
                        id="standard-basic" placeholder='password' variant="standard" />

                    <TextField
                        value={data.cpassword} type="password" name="cpassword" style={{ width: "100%", marginTop: 20 }} onChange={getdata}
                        id="standard-basic" placeholder='Confirm Password' variant="standard" />

                    <Button variant="contained" color="primary" style={{ marginTop: 20, maxWidth: "100%", height: 40 }} onClick={registerUser}>
                        Submit
                    </Button>
                    <p style={{ marginTop: 10 }}>ALready Have an Account &nbsp;<NavLink to="/" >Login</NavLink></p>
                </form>
            </div>
        </>
    )
}

export default Register