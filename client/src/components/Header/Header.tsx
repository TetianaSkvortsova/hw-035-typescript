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
import {useEffect, useState} from "react";
import {client} from "../../store/features/users.ts";
import {useAppDispatch} from "../../store/hooks.ts";

const OPEN_API_URL = import.meta.env.VITE_API_KEY_OPEN;

type HeaderProps = {
    onAuthChange: (isAuth: boolean) => void;
}

export default function Header({onAuthChange}: HeaderProps) {
    const dispatch = useAppDispatch();
    const [auth, setAuth] = useState(false);
    const credentials = {
        email: 'test@test.com',
        password: 'test@test.com'
    };
    const [loginData, setLoginData] = useState(credentials);
    const mainRoute = menuItems.find(item => item.path === '/');
    const privateRoutes = menuItems.filter(item => item.path !== '/');

    const handleChange = () => {
        if (!auth) {
            client.post(`${OPEN_API_URL}/login`, {...loginData})
                .then((response) => {
                    const newToken = response.data.token;
                    client.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    if (newToken) {
                        setAuth(true);
                        localStorage.setItem('token', newToken);
                        onAuthChange(true);
                    }
                });
        } else {
            delete client.defaults.headers.common['Authorization'];
            setAuth(false);
            localStorage.removeItem('token');
            onAuthChange(false);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target;
        setLoginData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    useEffect(() => {
        const currentToken = localStorage.getItem('token');
        const isAuthenticated = !!currentToken;
        setAuth(isAuthenticated);

        if (isAuthenticated) {
            client.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
            onAuthChange(true);
        }
    }, [dispatch]);

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
                        <MenuItem
                            key={mainRoute.path}
                            component={Link}
                            to={mainRoute.path}>
                            <Typography sx={{
                                textAlign: 'center',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                letterSpacing: '.1rem'
                            }}>{mainRoute.title}</Typography>
                        </MenuItem>
                        {auth && privateRoutes.map((item: TMenuItem) => (
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
                                    htmlFor="email"
                                    sx={{
                                        padding: '5px 0',
                                        color: '#ffffff',
                                        '&.Mui-focused': {
                                            color: 'inherit',
                                        }
                                    }}>Email address</InputLabel>
                                <Input
                                    id="email"
                                    aria-describedby="my-helper-text"
                                    value={loginData.email}
                                    onChange={handleInputChange}
                                />
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
                                <Input
                                    id="password"
                                    aria-describedby="my-helper-text"
                                    value={loginData.password}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
