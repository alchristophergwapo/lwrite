import React from "react";
import { Grid, Typography, CardHeader } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Comment from "./Comment";

const posts = [

  {
    title: "Love Lost",
    description: "This is my first post with more content inside",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRUh8Vw2CMarBf4IhzzD9Iu9RDgFDLhampfMmhLqScja8HWYXsL"
  },

  {
    title: "Journey",
    description: "This is my second post with more content inside",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQp1PeuwQtnwMQ2r_i0x5ztFzJH0DaePQIIXeOV0N13f4qd4e6S"
  },

  {
    title: "Love",
    description: "This is my third post with more content inside",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnP2iCBPQmX_jAx1KQIRRhYBKy_g_3YgQ5tGjDdVV3J3HIQpbF"
  },

  {
    title: "You are my reason for life",
    description: "This is my fourth post with more content inside",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRV82se8NdkhIMflZnKFjBTopZO3DZtRMWl-idP271-iPABR9e6"
  },

  {
    title: "Allow me",
    description: "This is my fifth post with more content inside",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrfA-ZqxWqS9GeRJ7ameS9XAqAJDwOHx68Gq6tkdZq-wnXZUno"
  },

  {
    title: "Closure and A Small Consolation",
    description: "This is my sixth post with more content inside",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSRjzBeVVUtSZOV8XyM4ZgjWSuwQK7YW46s0XNyXmXengQ-dRT9"
  }
]

function Post(props) {
  return (
    <center style={{ marginTop: 20, padding: 20 }}>
      <Grid container spacing={20} justify="center">
        {posts.map(post => (
          <div style={{ marginBottom: 20, marginLeft: 20 }}>
            <Grid item key={post.title}>
              <Card>
                <CardActionArea>
                  <CardHeader></CardHeader>
                  <CardMedia
                    component="img"
                    alt=" "
                    height='auto'
                    image={post.image}
                    title=" "
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography component="p">{post.description}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">Share</Button>
                  <Button size="small" color="primary">Learn More</Button>
                  <Button size="small" color="primary">Comment</Button>
                </CardActions>
              </Card>
            </Grid>
          </div>
        ))}
      </Grid>
    </center>
  );
}

export default Post;