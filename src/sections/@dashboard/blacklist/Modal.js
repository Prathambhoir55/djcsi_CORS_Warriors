/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab'
import BlacklistService from '../../../services/BlacklistService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px'
};
const button = { marginTop: '5%' }

export default function BasicModal({ open, setOpen, handleClose, handleOpen, photo, reason }) {

    const black = async () => {
        await BlacklistService.block({ photo: photo, text: reason })
            .then((res) => {
                console.log(res)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon icon="material-symbols:warning-rounded" width='40' />
                        <Typography variant='h5' sx={{ marginLeft: '2%' }}>Verify before black listing</Typography>
                    </div>
                    <TextField sx={{ width: '100%', marginTop: '5%' }} name='phone_no' label='Phone Number' />
                    <TextField sx={{ width: '100%', marginTop: '5%' }} name='password' label='Password' />
                    <LoadingButton onClick={black} sx={button} fullWidth size="large" type="submit" variant="contained">Submit</LoadingButton>

                </Box>
            </Modal>
        </div>
    );
}