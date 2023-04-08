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
    phoneno: '',
    password: '',
    imageurl: '',
    isemployee: true,
  });
  const handleSignup = () => {
    localStorage.setItem('cm_user', JSON.stringify(json));
    navigate('/dashboard/app', { replace: true });
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
        console.log(url2);
        setJson({ ...json, imageurl: url2 });
      });
    });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <TextField sx={textfield} name="name" label="Name" onChange={handleChange} />
        </Grid>
        <Grid item md={6}>
          <TextField sx={textfield} name="imageurl" type="file" onChange={(e) => uploadFile(e.target.files[0])} />
        </Grid>
        <Grid item md={6}>
          <TextField sx={textfield} name="email" label="Email address" onChange={handleChange} />
        </Grid>
        <Grid item md={6}>
          <TextField sx={textfield} name="phoneno" label="Phone Number" onChange={handleChange} />
        </Grid>
        <Grid item md={6}>
          <TextField
            sx={textfield}
            onChange={handleChange}
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
          <TextField
            sx={textfield}
            name="password"
            onChange={handleChange}
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

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSignup}>
        SignUp
      </LoadingButton>
    </>
  );
}
