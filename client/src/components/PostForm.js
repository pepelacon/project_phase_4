import React from 'react'
// import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useFormik } from "formik"
import * as yup from "yup"
import Box from '@mui/material/Box';
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

function PostForm({userId, setToggle, toggle}) {
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    title: yup.string().required("Must enter a title"),
    budget: yup.number().positive()
  })
  console.log(userId);
  const formik = useFormik({
    initialValues: {
      title:'',
      category:'',
      image:'',
      description:'',
      user_id: userId,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if(res.ok) {
          res.json().then(post => {
            setToggle(!toggle)
            navigate(`/`)
          })
        }
      })
    },
  })

  const [state, setState] = useState(true)
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [alignment, setAlignment] = useState('your posts');

  const handleList = (event, newAlignment) => {
      setAlignment(newAlignment);
      setState(!state)
  };

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

  const card = (
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
                    <ToggleButton id='toggler' value="favorite" color='third' >New Post</ToggleButton>
                </Link>
                <Link to="/profile/likes">
                    <ToggleButton id='toggler' value="favorite" color='third' >Likes</ToggleButton>
                </Link>
                <Link to="/profile/friends">
                    <ToggleButton id='toggler' value="friends" color='third' >Friends</ToggleButton>
                </Link>
                <Link to="/profile/settings">
                    <ToggleButton id='toggler' value="favorite" color='third' >Edit Profile</ToggleButton>
                </Link>
            </ToggleButtonGroup>                
    <React.Fragment>         
        <h1 id='new-post'>Create a new post!</h1>
        <CardContent>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Typography id='silly-forms' sx={{ fontSize: 20 }} color="secondary" >
                Title
            </Typography>
            <input type='text' name='title' value={formik.values.title} onChange={formik.handleChange} />
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
            <input type='text' name='image' value={formik.values.image} onChange={formik.handleChange} />
            <Typography id='silly-forms' sx={{ fontSize: 20 }} color="text.secondary">
                Description
            </Typography>
            <textarea type='text' rows='4' cols='50' name='description' value={formik.values.description} onChange={formik.handleChange} />
            <CardActions>
                <Button type='input' size="large" color='secondary' align='center'>Submit</Button>
            </CardActions>
            </form> 
        </CardContent>
    </React.Fragment>
    </ThemeProvider>
    </div>
)
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card}</Card>
        </Box>
    )
}
  
export default PostForm

