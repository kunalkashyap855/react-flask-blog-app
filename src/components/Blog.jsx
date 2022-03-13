import React from 'react'
import { useNavigate } from "react-router-dom";
import { 
    Card, 
    CardActions, 
    CardMedia, 
    CardContent, 
    Typography, 
    Button } 
from '@mui/material';

function Blog({ blog }) {
  const navigate = useNavigate();
  
  return (
    <Card sx={{ maxWidth: 800, margin: "10%", boxShadow: 0 }}>
        <CardMedia
            component="img"
            height="360"
            image="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3328&q=80"
            alt="Computer"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {blog.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {
                    blog.body.length > 144 ?
                    blog.body.substring(0, 141) + "..." :
                    blog.body
                }
            </Typography>
        </CardContent>
        <CardActions style={{ display: "flex", justifyContent: "space-between"}}>
            <Button size="small" color="secondary" onClick={() => navigate(`new/${blog.id}`)}>
                Edit
            </Button>
            <Button size="small" color="primary" onClick={() => navigate(`blogs/${blog.id}`)}>
                Read
            </Button>
        </CardActions>
    </Card>
  )
}

export default Blog