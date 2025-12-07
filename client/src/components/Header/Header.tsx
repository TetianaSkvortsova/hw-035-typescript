import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import {menuItems, type TMenuItem} from '../../common/menu.ts';
import {FormControl, Input, InputLabel, MenuItem} from '@mui/material';
import {Link} from 'react-router';

export default function Header() {
    const [auth, setAuth] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <FormGroup
                sx={{
                    display: 'flex',
                    marginLeft: 'auto',
                    width: 'fit-content',
                }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={auth}
                            onChange={handleChange}
                            aria-label="login switch"
                        />
                    }
                    label={auth ? 'Logout' : 'Login'}
                />
            </FormGroup>
            <AppBar position="static" sx={{borderRadius: 2}}>
                <Toolbar>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {menuItems.map((item: TMenuItem) => (
                            <MenuItem
                                key={item.path}
                                component={Link}
                                to={item.path}>
                                <Typography sx={{
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    fontWeight: 600,
                                    letterSpacing: '.1rem'
                                }}>{item.title}</Typography>
                            </MenuItem>
                        ))}
                    </Box>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                    )}
                    {!auth && (
                        <Box>
                            <FormControl sx={{marginRight: '20px', borderBottom: '1px solid #ffffff'}}>
                                <InputLabel
                                    htmlFor="login"
                                    sx={{
                                        padding: '5px 0',
                                        color: '#ffffff',
                                        '&.Mui-focused': {
                                            color: 'inherit',
                                        }
                                    }}>Email address</InputLabel>
                                <Input id="login" aria-describedby="my-helper-text"/>
                                {/*<FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>*/}
                            </FormControl>
                            <FormControl sx={{borderBottom: '1px solid #ffffff',}}>
                                <InputLabel
                                    htmlFor="password"
                                    sx={{
                                        padding: '5px 0',
                                        color: '#ffffff',
                                        '&.Mui-focused': {
                                            color: 'inherit',
                                        }
                                    }}>Password</InputLabel>
                                <Input id="password" aria-describedby="my-helper-text"/>
                                {/*<FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>*/}
                            </FormControl>
                        </Box>

                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
