import React, { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button } from '@mui/material';

import styles from './newBlog.module.css';

const NewBlog = () => {
  useLayoutEffect(() => {
      window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [author, setAuthor] = useState("")

  useEffect(() => {
    if(id > 0) {
      axios.get(`https://hidden-peak-34039.herokuapp.com/blogs/${id}`)
      .then(res => {
        setTitle(res.data.title)
        setBody(res.data.body)
        setAuthor(res.data.author)
      })
      .catch(err => alert("Error occurred in fetching blog details. Please try again."))
    }
  }, [])
 
  const publish = () => {
      if (id > 0) {
        axios.patch(`https://hidden-peak-34039.herokuapp.com/blogs/${id}`, {
          title, body, author
        })
        .then(res => {
            if(res.data.id) {
              navigate(`/blogs/${res.data.id}`, { replace: true })
            }
        })
        .catch(err => alert("Error in publishing edited post"))
      } else {
        axios.post("https://hidden-peak-34039.herokuapp.com/blogs", {
          title, body, author
        })
        .then(res => {
            if(res.data.id) {
              navigate(`/blogs/${res.data.id}`, { replace: true })
            }
        })
        .catch(err => alert("Error in publishing new post"))
      }
  }
  return (
    <Container className={styles.blogGrid} maxWidth="sm">
        <div className={styles.nav}>
          <Link to="/" style={{ textDecoration: "none", color: "#1a2027" }}>
            <Typography variant="h4" gutterBottom component="div">
                Flask+React Blog App
            </Typography>
          </Link>
        </div>
        <div className={styles.blogForm}>
            <TextField
                fullWidth
                id="filled-textarea"
                label="Title"
                variant="standard"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <TextField
                fullWidth
                id="filled-textarea"
                label="Body"
                placeholder="Type here..."
                multiline
                variant="standard"
                style={{ marginTop: "3%"}}
                value={body}
                onChange={e => setBody(e.target.value)}
            />
            <TextField
                id="filled-textarea"
                label="Author"
                placeholder='Kunal Kashyap'
                variant="outlined"
                style={{ marginTop: "3%", alignSelf: "flex-start"}}
                value={author}
                onChange={e => setAuthor(e.target.value)}
            />
            <Button variant="contained" onClick={publish} style={{ marginTop: "3%", alignSelf: "flex-end"}}>Publish</Button>
        </div>
    </Container>
  )
}

export default NewBlog