import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useParams } from 'react-router-dom';

const View = () => {

    const [data, setData] = useState();
 

    const { id } = useParams();

    // get data
    const getbookdata = async () => {
        const res = await fetch(`/getbookone/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });


        const data1 = await res.json();
      

        if (res.status === 422 || !data1) {
            console.log("error");
        } else {
            setData(data1)
        }
    };

    useEffect(() => {
        getbookdata();
    }, [])

    return (
        <>
            {
                data ? <TableContainer style={{marginTop:20}} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow >
                                <TableCell>Book Id</TableCell>
                                <TableCell >Book Name</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Mobile</TableCell>
                                <TableCell>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow
                                key={data.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {1}
                                </TableCell>
                                <TableCell >{data.book}</TableCell>
                                <TableCell >{data.author}</TableCell>
                                <TableCell >{data.username}</TableCell>
                                <TableCell >{data.number}</TableCell>
                                <TableCell >{data.desc}</TableCell>

                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer> : ""
            }

        </>
    )
}

export default View