/* eslint-disable  */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import AuthService from '../../../services/AuthService';

// ----------------------------------------------------------------------
const textfield = { width: '100%' };

export default function SignUpForm() {
    const navigate = useNavigate();

    useEffect(() => {
        JSON.parse(localStorage.getItem('cm_user')) ? navigate('/dashboard/app') : navigate('/signup');
    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const [json, setJson] = useState({
        name: '',
        email: '',
        phone_no: '',
        password: '',
        company: '',
        confirm_password: '',
        isemployee: false,
    });
    const handleSignUp = async () => {

        await AuthService.hrregister({ user: json })
            .then((res) => {
                console.log(res)
                localStorage.setItem('cm_user', JSON.stringify(res.data.user));
                localStorage.setItem('cm_token', res.data.token);
                navigate('/dashboard/app', { replace: true })
            }).catch((e) => console.log(e))

    };
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item md={6}>
                    <TextField sx={textfield} name="name" value={json.name} label="Name" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField sx={textfield} name="company" value={json.company} label="Company Name" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField sx={textfield} name="email" value={json.email} label="Email address" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        sx={textfield}
                        name="phone_no"
                        value={json.phone_no}
                        label="Phone Number"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        sx={textfield}
                        name="password"
                        value={json.password}
                        onChange={handleChange}
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        sx={textfield}
                        name="confirm_password"
                        onChange={handleChange}
                        value={json.confirm_password}
                        label="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <Checkbox name="remember" label="Remember me" />
                <Link variant="subtitle2" underline="hover">
                    Forgot password?
                </Link>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSignUp}>
                SignUp
            </LoadingButton>
        </>
    );
}
