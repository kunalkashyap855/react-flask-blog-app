import React, {useState, useEffect, useLayoutEffect} from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

import styles from './blogDetail.module.css';

const BlogDetail = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  const { id } = useParams();
  const [blog, setBlog] = useState({})
  
  useEffect(() => {
    axios.get(`https://hidden-peak-34039.herokuapp.com/blogs/${id}`)
      .then(res => {
        setBlog(res.data)
      })
      .catch(err => alert("Error occurred in fetching blog details. Please try again."))
  }, [])

  return (
    <Container className={styles.blogGrid} maxWidth="sm">
        <div className={styles.nav}>
          <Link to="/" style={{ textDecoration: "none", color: "#1a2027" }}>
            <Typography variant="h4" gutterBottom component="div">
                Flask+React Blog App
            </Typography>
          </Link>
          <Link to="/new/0" style={{ textDecoration: "none", color: "#1a2027" }}>
            <Typography variant="h6" gutterBottom component="div">
              New Article
            </Typography>
          </Link>
        </div>
        <div className={styles.blogDetail}>
            <Typography variant='subtitle2' component="div" gutterBottom>Published on {new Date(2022, 2, 8).toUTCString().slice(0,16)}</Typography>
            <Typography variant="h5" component="div" gutterBottom>
            {blog.title}
            </Typography>
            <Typography variant='subtitle1' component="div" gutterBottom>{blog.author}</Typography>
            <img
                src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3328&q=80"
                alt="computer"
                loading="lazy"
                className={styles.blogImage}
                height={600}
            />
            <Typography variant="body1" component="div" gutterBottom>
            {blog.body}
            </Typography>
        </div>
    </Container>
  )
}

export default BlogDetail