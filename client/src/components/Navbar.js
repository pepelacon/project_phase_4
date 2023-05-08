import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const Navbar = () => {
    return (
        <div classname='nav-bar'>
            <Stack direction="row" spacing={2}>
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