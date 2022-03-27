import React, { useEffect, useState, useContext } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { LoginContext } from './contextProvider/Context';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Login from './Login';

const Home = () => {

    const [bookdata, setBookdata] = useState([]);
    const history = useNavigate();

    const { account, setAccount } = useContext(LoginContext);
    console.log(account);

    const getbookdata = async () => {
        const res = await fetch("/getbook", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });


        const data = await res.json();
        // console.log(data);

        if (res.status === 422 || !data) {
            console.log("error");
        } else {
            setBookdata(data)
        }
    };


    useEffect(() => {
        getbookdata();
    }, []);

    // delete books data
    const deleteBooks = async (id) => {

        const dltbook = await fetch(`/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });


        const data1 = await dltbook.json();
        console.log(data1);

        if (dltbook.status === 422 || !data1) {
            console.log("error");
        } else {
            getbookdata()
        }
    };

    
    return (
        <>
            {
                account ? <div className="container mt-2">
                    <h2 className='text-center mt-4'> Boook Store App</h2>
                    <div style={{ position: "relative", display: "flex", justifyContent: "end", marginBottom: "20px" }}>
                        <Button variant="contained" color="primary" >
                            <NavLink to="/bookadd" style={{ textDecoration: "none", color: "#fff" }}>Add Book</NavLink>
                        </Button>
                    </div>

                    <div className="Books">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead style={{ background: "#111" }}>
                                    <TableRow >
                                        <TableCell style={{ color: "#fff" }}>Book Id</TableCell>
                                        <TableCell style={{ color: "#fff" }} >Book Name</TableCell>
                                        <TableCell style={{ color: "#fff" }}>Author</TableCell>
                                        <TableCell style={{ textAlign: "center", color: "#fff" }}>Functions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookdata.map((element, key) => (
                                        <TableRow
                                            key={element.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {key + 1}
                                            </TableCell>
                                            <TableCell >{element.book}</TableCell>
                                            <TableCell >{element.author}</TableCell>
                                            <TableCell style={{ display: "flex", justifyContent: "space-evenly" }}>

                                                <Button variant="contained" color="primary">
                                                    <NavLink to={`/view/${element._id}`} style={{ textDecoration: "none", color: "#fff" }}>view</NavLink>
                                                </Button>
                                                <Button variant="contained" color="success">
                                                    <NavLink to={`/bookupdate/${element._id}`} style={{ textDecoration: "none", color: "#fff" }}>edit</NavLink>
                                                </Button>
                                                <Button variant="contained" color="error" onClick={() => deleteBooks(element._id)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div> :<Login />
            }

        </>
    )
}

export default Home