/* eslint-disable*/
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import { FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import successHandler from '../../../helper/sucessHandler';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  border: 'none',
  boxShadow: 24,
  p: 4,
};
const minDistance = 5;
const marks = [
  {
    value: 9,
    label: '9:00AM',
  },
  {
    value: 12,
    label: '12:00PM',
  },
  {
    value: 15,
    label: '3:00PM',
  },
  {
    value: 18,
    label: '6:00PM',
  },
];
function valuetext(value) {
  return `${value}:00`;
}
export default function BasicModal({ open, setOpen, handleOpen, handleClose, phone_no, name }) {
  const [value1, setValue1] = React.useState([20, 37]);
  const [json, setJson] = useState({
    position: '',
    salary: '',
    start_time: '',
    end_time: '',
  });
  const handleSubmit = () => {
    successHandler(`You've successfully Hired ${name}`);
  };
  const [role, setRole] = useState('');
  const handleRole = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJson({ ...json, [name]: value });
  };
  const button = { marginTop: '5%' };

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
    setJson({ ...json, start_time: newValue[0], end_time: newValue[1] });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Time Slot
            <Slider
              getAriaLabel={() => 'Minimum distance'}
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={6}
              max={21}
              getAriaValueText={valuetext}
              disableSwap
            />
            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
              <Grid item xs={6}>
                <TextField
                  label="Positon"
                  value={role}
                  onChange={(e) => {
                    handleRole(e);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    label="Amount"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Typography>
          <LoadingButton sx={button} fullWidth size="large" type="submit" variant="contained" onSubmit={handleSubmit}>
            Submit
          </LoadingButton>
        </Box>
      </Modal>
    </div>
  );
}
