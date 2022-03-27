import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {

  const [data, setData] = useState({
    book: "",
    author: "",
    price: "",
    username: "",
    email: "",
    number: "",
    desc: ""
  });

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

  const { id } = useParams();
  // console.log(id);

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



  const updatedata = async (e) => {

    e.preventDefault();

    const { book, author, price, username, email, number, desc } = data;


    const res = await fetch(`/updatebook/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        book, author, price, username, email, number, desc
      })
    })

    const data2 = await res.json();
    
    if (res.status === 422 || !data2) {
      console.log("error");
    } else {
      history("/dash")
    }
  }


  // console.log(data);



  return (
    <>
      <div className="container mt-2">
        <h2 className='text-center mt-2'>Update Book data</h2>
        <div className="form">
          <form className="form_style">
            <TextField name="book"
              value={data.book} className="form_inp" onChange={getdata}
              id="standard-basic" placeholder='Bookname' variant="standard" />
            <TextField
              value={data.author} className="form_inp" onChange={getdata}
              name="author" id="standard-basic" placeholder='Author Name' variant="standard" />
            <TextField
              value={data.price} className="form_inp" onChange={getdata}
              name="price" id="standard-basic" placeholder='Price' variant="standard" />
            <TextField
              value={data.username} className="form_inp" onChange={getdata}
              name="username" id="standard-basic" placeholder='User name' variant="standard" />
            <TextField
              value={data.email} className="form_inp" onChange={getdata}
              name="email" id="standard-basic" type="email" placeholder='User email' variant="standard" />
            <TextField
              value={data.number} className="form_inp" onChange={getdata}
              name="number" id="standard-basic" placeholder='number' variant="standard" />
            <TextField name="desc"
              value={data.desc} className="form_inp" onChange={getdata}
              id="standard-basic" placeholder='Description' variant="standard" />
            <Button variant="contained" color="primary" style={{ marginTop: 20, width: "92%", height: 40 }} onClick={updatedata} >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Update