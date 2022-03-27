import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const Bookadd = () => {

  const [data, setData] = useState({
    book: "",
    author: "",
    price: "",
    username: "",
    email: "",
    number: "",
    desc: ""
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


  // add data

  const registerddata = async (e) => {
    e.preventDefault();

    const { book, author, price, username, email, number, desc } = data;

    if (!book) {
      alert("enter book name")
    } else if (!author) {
      alert("enter author name")
    } else if (!price) {
      alert("enter Price")
    } else if (!username) {
      alert("enter user name")
    } else if (!email) {
      alert("enter email")
    } else if (!email.includes("@")) {
      alert("enter valid email")
    } else if (!number) {
      alert("enter mobile number")
    } else if (number.length < 10) {
      alert("enter valid mobile number")
    } else {
      const res = await fetch("/bookadd", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          book, author, price, username, email, number, desc
        })
      });

      const bookdata = await res.json();

      if (res.status === 422 || !bookdata) {
        console.log("error");
      } else {
        history("/dash");
      }
    }

  }

  return (
    <>
      <div className="container mt-2">
        <h2 className='text-center mt-2'>Add New Book</h2>
        <div className="form">
          <form className="form_style" method='POST'>
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
            <Button variant="contained" color="primary" style={{ marginTop: 20, width: "92%", height: 40 }} onClick={registerddata} >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>)
}

export default Bookadd