import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import small from '../images/small.png';

const Navbar = () => {
    return (
        <div classname='nav-bar'> Navbar
            <Stack direction="row" spacing={2}>
                <img className="small-logo" src={small}/>
                <Button color="secondary">Secondary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="secondary">Secondary</Button>
            </Stack>
        </div>
    )
}

export default Navbar