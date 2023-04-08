/* eslint-disable */
import { CardMedia, Grid, TextField } from '@mui/material'
import React from 'react'
import blacklist from '../../../components/images/blacklist.png'
import { LoadingButton } from '@mui/lab'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css';
import './bl.css'
import BasicModal from './Modal'

const textfield = { width: '100%', marginTop: '5%' }
const image = { marginTop: '5%', marginBottom: '5%', borderRadius: '10px' }
const button = { marginTop: '5%' }

function HRblacklisting() {
    const getUploadParams = () => {
        return { url: 'https://httpbin.org/post' };
    };

    const handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta);
    };

    const handleSubmit = (files, allFiles) => {
        console.log(files[0].file);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Grid container sx={{ width: '100%', height: '100%', color: 'white' }}>
                <Grid item md={3} xs={1} />
                <Grid item md={6} xs={10}>
                    <CardMedia component='img' image={blacklist} sx={image} />
                    <Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        onSubmit={handleSubmit}
                        maxFiles={1}
                        multiple={false}
                        canCancel={false}
                        inputContent="Drop Image"
                        styles={{
                            dropzone: { width: '100%', height: 200, overFlow: 'hidden', "&::-webkit-scrollbar": { display: 'none' } },
                            dropzoneActive: { borderColor: 'grey', overFlow: 'hidden', "&::-webkit-scrollbar": { display: 'none' } }, "&::-webkit-scrollbar": { display: 'none' },

                        }}
                    />
                    <TextField autoFocus sx={textfield} multiline rows={7} label='Reason' />
                    <LoadingButton sx={button} onClick={handleOpen} fullWidth size="large" type="submit" variant="contained">Submit</LoadingButton>
                </Grid>
                <Grid item md={3} xs={1} />
            </Grid>
            <BasicModal open={open} setOpen={setOpen} handleClose={handleClose} handleOpen={handleOpen} />
        </>
    )
}

export default HRblacklisting