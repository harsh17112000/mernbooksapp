import React, { useContext, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom'
import { LoginContext } from './contextProvider/Context';

const Header = () => {

    const { account, setAccount } = useContext(LoginContext);
    console.log(account);

    // user get data
    const getuserdata = async () => {
        const res = await fetch("/validuserdata", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        // console.log(res);
        const data = await res.json();


        if (res.status === 422 || !data) {
            console.log("user not login");
        } else {

            console.log(data);
            setAccount(data)
        }
    };


    useEffect(() => {
        getuserdata()
    }, []);


    // logout user
    const logoutuser = async () => {
        const res1 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data1 = await res1.json();
        // console.log(data1);
        if (res1.status !== 201) {
            console.log("error");
        } else {

            console.log("user logout hain");
            setAccount(false);
        }
    }


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ background: "#111" }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <NavLink to="/" className="text-decoration-none text-light mx-3">Book Store</NavLink>
                        </Typography>

                        {
                            account ? <Button color="inherit">
                                <NavLink to="/dash" className="text-decoration-none text-light mx-3">DashBoard</NavLink>
                            </Button> : ""
                        }

                        {
                            account ? <Button color="inherit">
                                {account.fname}
                            </Button> : ""
                        }

                        {
                            account ? <Button color="inherit">
                                <NavLink to="/" className="text-decoration-none text-light mx-3" onClick={logoutuser}>Logout</NavLink>
                            </Button> : <Button color="inherit">
                                <NavLink to="/" className="text-decoration-none text-light mx-3">Login</NavLink>
                            </Button>
                        }

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Header