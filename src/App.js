import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Container, Grid, Typography } from '@mui/material';

import Blog from './components/Blog';

import './App.css';

// Localhost API URL = http://127.0.0.1:5000/blogs/

function App() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    axios.get('https://hidden-peak-34039.herokuapp.com/blogs')
      .then(res => {
        setBlogs(res.data.blogs)
      })
      .catch(err => alert("Error occurred in fetching blogs. Please try again."))
    // if(res.status !== 200)
    //     alert("Cannot fetch blog data!")
  }, [])

  return (
    <div className="App">
      <Container className='blogGrid' maxWidth="sm">
        <div className='nav'>
          <Typography variant="h4" gutterBottom component="div">
            Flask+React Blog App
          </Typography>
          <Link to="new/0" style={{ textDecoration: "none", color: "#1a2027" }}>
            <Typography variant="h6" gutterBottom component="div">
              New Article
            </Typography>
          </Link>
        </div>
        {/* <Typography variant="body1" component="div" gutterBottom>
          A business big enough that it could be listed on the NASDAQ goes belly up. Disappears! It ceases to exist without me. 
          No, you clearly don't know who you're talking to, so let me clue you in. I am not in danger, Skyler. I AM the danger! 
          A guy opens his door and gets shot and you think that of me? No. I am the one who knocks! 
        </Typography> */}
        <Grid 
          container 
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          {
            blogs.sort((a, b) => {return b.id-a.id}).map(blog => {
              return (
                <Grid className='blogItem' item xs={8} md={6} key={blog.id}>
                  <center><Blog blog={blog} /></center>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default App;
