import React, { useEffect, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { amber } from '@mui/material/colors';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth0 } from '@auth0/auth0-react';

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

function Settings({userId}) {
  const [refreshPage, setRefreshPage] = useState(false);
  const [state, setState] = useState(true);
  const [alignment, setAlignment] = useState('your posts');
  
  const handleList = (event, newAlignment) => {
      setAlignment(newAlignment);
      setState(!state);
    };
    
    //   function getUserData():
    
    
    
    const formSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Must enter email'),
        username: yup.string().required('Must enter a username'),
    });
    
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.status === 200) {
                    setRefreshPage(!refreshPage)
                }
            })
        },
    })
    
    const { user } = useAuth0();
  return (
    <div id="profile-page">
      <p>Welcome, {user.name}</p>
      <ThemeProvider theme={theme}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleList}
          aria-label="Large"
        >
          <Link to="/profile">
            <ToggleButton id="toggler" value="your posts" color="third">
              Your Posts
            </ToggleButton>
          </Link>
          <Link to="/profile/new">
            <ToggleButton id="toggler" value="new post" color="third">
              New Post
            </ToggleButton>
          </Link>
          <Link to="/profile/likes">
            <ToggleButton id="toggler" value="favorite" color="third">
              Likes
            </ToggleButton>
          </Link>
          <Link to="/profile/friends">
            <ToggleButton id="toggler" value="friends" color="third">
              Friends
            </ToggleButton>
          </Link>
          <Link to="/profile/settings">
            <ToggleButton id="toggler" value="settings" color="third">
              Edit Profile
            </ToggleButton>
          </Link>
        </ToggleButtonGroup>
      </ThemeProvider>
      <h2>Edit your profile</h2>
      <form onSubmit={formik.handleSubmit} style={{ margin: '30px' }}>
        <label htmlFor="email">Email Address</label>
        <br />
        <input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p style={{ color: "red" }}> {formik.errors.email}</p>
        <label htmlFor="username">Username</label>
        <br />

        <input
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
        />
        <p style={{ color: "red" }}> {formik.errors.username}</p>
        <button type="submit">Submit</button>
        </form>
    </div>
    );
};

export default Settings;