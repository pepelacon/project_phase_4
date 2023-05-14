import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from '@mui/material/colors';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react'


function EditPost({setToggle, toggle}) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const formSchema = yup.object().shape({
    title: yup.string().required("Must enter a title"),
    budget: yup.number().positive(),
  });
  const navigate = useNavigate();

  const [state, setState] = useState(true)
  const { user } = useAuth0();
  const [alignment, setAlignment] = useState('your posts');

  const handleList = (newAlignment) => {
      setAlignment(newAlignment);
      setState(!state)
  };


  useEffect(() => {
    fetch(`/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => setError(err));
  }, [id]);
  console.log(post);
  const formik = useFormik({
    initialValues: {
      title: post?.title || "",
      category: post?.category || "",
      image: post?.image || "",
      description: post?.description || ""
  
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(`/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((post) => {
              console.log("Post updated successfully!", post);
            });
          } else {
            res.json().then((error) => {
              console.error("Failed to update post!", error);
            });
          }
          setToggle(!toggle)
          navigate(`/profile`)
        })
        .catch((err) => {
          console.error("An error occurred while updating post!", err);
        });
    },
  });

  if (error) {
    return <div>Failed to fetch post!</div>;
  }

  if (!post) {
    return <div>Loading post...</div>;
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: amber[50],
      },
      secondary: {
        main: '#5c6f59',
      },
      third: {
        main: '#757269',
      },
    },
  });
  return (
    <div id='profile-page'>       
    <p>Welcome, {user.name}</p>
    <ThemeProvider theme={theme}>
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={alignment}
                onChange={handleList}
                aria-label="Large"
            >
                <Link to="/profile">
                    <ToggleButton id='toggler' value="your posts" color='third' >Your Posts</ToggleButton>
                </Link>
                <Link to="/profile/new">
                    <ToggleButton id='toggler' value="new post" color='third' >New Post</ToggleButton>
                </Link>
                <Link to="/profile/favorite">
                    <ToggleButton id='toggler' value="favorite" color='third' >Favorite</ToggleButton>
                </Link>
                <Link to="/profile/friends">
                    <ToggleButton id='toggler' value="friends" color='third' >Friends</ToggleButton>
                </Link>
                <Link to="/profile/settings">
                    <ToggleButton id='toggler' value="favorite" color='third' >Edit Profile</ToggleButton>
                </Link>
            </ToggleButtonGroup>                
    <React.Fragment> 
    <Card id='new-form-card' variant="outlined" sx={{ maxWidth: 500 }}>       
        <p id='new-post'>Edit post!</p>
        <CardContent>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>


        <Typography id='silly-forms' sx={{ fontSize: 20 }} color="secondary" >
                Title
        </Typography>


        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <Typography id='silly-forms' sx={{ fontSize: 20 }} color="secondary">
                Category
            </Typography>
        <select
          className="form-input"
          name="category"
          id="category"
          onChange={formik.handleChange}
          value={formik.values.category}
        >
          <option value="">Pick a Category</option>
            <option value="Books">Animals</option>
            <option value="Books">Art</option>
            <option value="Books">Beauty</option>
            <option value="Books">Books</option>
            <option value="DIY">DIY</option>
            <option value="Fashion">Fashion</option>
            <option value="Electronics">Food</option>
            <option value="Home Goods">Home Goods</option>
            <option value="Outdoors">Outdoors</option>
            <option value="Sports">Sports</option>
            <option value="Travel">Travel</option>
        </select>

        <Typography id='silly-forms' sx={{ fontSize: 20 }} color="text.secondary">
                Image
            </Typography>
        <input
          type="text"
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
        />

        <Typography id='silly-forms' sx={{ fontSize: 20 }} color="text.secondary">
                Description
            </Typography>
        <textarea
          type="text"
          rows="4"
          cols="50"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />

<CardActions>
                <Button id='submit-button' type='input' size="large" color='secondary' center>Submit</Button>
            </CardActions>
      </form>
      </CardContent>
      </Card>
    </React.Fragment>
    </ThemeProvider>
    </div>
  );
}

export default EditPost;