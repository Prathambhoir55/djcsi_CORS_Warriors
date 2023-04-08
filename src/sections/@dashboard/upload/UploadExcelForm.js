/* eslint-disable */
import { useState } from 'react';
import { Grid, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import React from 'react'
import { LoadingButton } from '@mui/lab';
import readXlsxFile from 'read-excel-file';

const AddBtn = {
    fontFamily: 'Poppins', padding: '0px 2.6rem', height: '100%'
}

function UploadExcelForm() {
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const [rows, setRows] = useState([])


    return (
        <>
            <Grid container sx={{ width: '100%' }}>
                <Grid item md={10}>
                    <TextField
                        sx={{ width: '100%' }}
                        type="file"
                        onChange={(event) => {
                            readXlsxFile(event.target.files[0])
                                .then((rows2) => {
                                    setRows(rows2)
                                    console.log(rows2)
                                });
                        }}
                        inputProps={{ accept: ".xlsx" }}
                    />

                </Grid>
                <Grid item md={2}>
                    <LoadingButton
                        type="submit"
                        color="primary"
                        style={AddBtn}
                        loading={loading}
                        variant="contained"
                    >
                        Upload
                    </LoadingButton>
                </Grid>
                <Grid item md={12}>
                    <TableHead>
                        <TableRow>
                            {rows.length !== 0 && rows.map((headCell, index) => {
                                console.log(headCell)
                                return <>
                                    {
                                        headCell.map((data, index2) => {
                                            if (index === 0) {
                                                <TableCell key={index2}>
                                                    {data}
                                                </TableCell>
                                            }
                                        })
                                    }
                                </>
                            })}
                        </TableRow>
                    </TableHead>
                </Grid>
            </Grid>
        </>
    )
}

export default UploadExcelForm