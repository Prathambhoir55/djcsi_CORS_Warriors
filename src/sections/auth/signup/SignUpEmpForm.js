/* eslint-disable */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { v4 as uuidv4 } from 'uuid';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "../../../firebase/config"

// ----------------------------------------------------------------------
const textfield = { width: '100%' }

export default function SignUpEmpForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        navigate('/dashboard', { replace: true });
    };

    const uploadFile = (imageUpload) => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name} + ${uuidv4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                // setImageUrls(url);
                console.log(url);
            });
        });
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item md={6}>
                    <TextField sx={textfield} name="name" label="Name" />
                </Grid>
                <Grid item md={6}>
                    <TextField sx={textfield} type="file"
                        onChange={(event) => uploadFile(event.target.files[0])}
                        inputProps={{ accept: ".jpg" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField sx={textfield} name="email" label="Email address" />
                </Grid>
                <Grid item md={6}>
                    <TextField sx={textfield} name="phoneno" label="Phone Number" />
                </Grid>
                <Grid item md={6}>
                    <TextField sx={textfield}
                        name="password"
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
                    <TextField sx={textfield}
                        name="password"
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

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
                Login
            </LoadingButton>
        </>
    );
}
