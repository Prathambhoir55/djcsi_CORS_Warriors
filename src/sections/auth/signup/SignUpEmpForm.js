/* eslint-disable */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL, listAll, list } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import { upload } from '../../../services/UploadImg';
import AuthService from 'src/services/AuthService';

// ----------------------------------------------------------------------
const textfield = { width: '100%' };

export default function SignUpEmpForm() {
    const navigate = useNavigate();
    useEffect(() => {
        JSON.parse(localStorage.getItem('cm_user')) ? navigate('/dashboard/profile') : navigate('/signup');
    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const [json, setJson] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone_no: '',
        isemployee: true,
    });
    const [photo, setPhoto] = useState('')

    const handleSignup = async () => {
        await AuthService.empregister({ user: json, photo: photo })
            .then((res) => {
                console.log(res)
                localStorage.setItem('cm_user', JSON.stringify(json));
                navigate('/dashboard/profile', { replace: true });
            }).catch((e) => console.log(e))
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setJson({ ...json, [name]: value });
    };

    const uploadFile = (imageUpload) => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name} + ${uuidv4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url2) => {
                console.log(url2)
                setPhoto(url2);
            });
        });
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item md={6}>
                    <TextField sx={textfield} name="name" value={json.name} label="Name" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField sx={textfield} name='photo' type='file' onChange={(e) => uploadFile(e.target.files[0])} />
                </Grid>
                <Grid item md={6}>
                    <TextField sx={textfield} name="email" value={json.email} label="Email address" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField sx={textfield} name="phone_no" value={json.phone_no} label="Phone Number" onChange={handleChange} />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        sx={textfield}
                        onChange={handleChange}
                        name="password"
                        value={json.password}
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

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSignup}>
                SignUp
            </LoadingButton>
        </>
    );
}
