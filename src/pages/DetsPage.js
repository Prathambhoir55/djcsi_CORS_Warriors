/* eslint-disable */
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import BlacklistService from 'src/services/BlacklistService';
import UserDets from './UserDets';
import { useState } from 'react';
import { Grid } from '@mui/material';

function DetsPage() {
    const params = useParams();
    const idparam = params['*']
    console.log(idparam)
    const [res, setRes] = useState(null)
    useEffect(() => {
        const func = async () => {
            await BlacklistService.view(idparam)
                .then((res2) => {
                    console.log(res2.data, 'hey')
                    setRes(res2.data)
                }).catch((e) => console.log(e))
        }
        func()
    }, [idparam])

    return (
        <Grid sx={{ width: '100%' }}>
            <UserDets data={res} />
        </Grid>
    )
}

export default DetsPage