/* eslint-disable */
import { CardMedia, Grid, TextField } from '@mui/material'
import React from 'react'
import banner from '../components/images/banner.png'
import { LoadingButton } from '@mui/lab'

const textfield = { width: '100%', marginTop: '5%' }
const image = { marginTop: '5%', borderRadius: '10px' }
const button = { marginTop: '5%' }
function Review() {
    return (
        <>
            <Grid container>
                <Grid item md={3} xs={1} />
                <Grid item md={6} xs={10}>
                    <CardMedia component='img' image={banner} sx={image} />
                    <TextField autoFocus sx={textfield} multiline rows={13} label='Review' />
                    <LoadingButton sx={button} fullWidth size="large" type="submit" variant="contained">Submit</LoadingButton>
                </Grid>
                <Grid item md={3} xs={1} />
            </Grid>

        </>
    )
}

export default Review