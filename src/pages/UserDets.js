/* eslint-disable */
import React, { useState } from 'react';
import { Card, CardContent, CardMedia } from '@mui/material';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody,
    MDBModalTitle,
    MDBModalFooter,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
} from 'mdb-react-ui-kit';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, TextField } from '@mui/material';
// components
import Iconify from '../components/iconify';
// sections
import {
    AppTasks,
    AppNewsUpdate,
    AppOrderTimeline,
    AppCurrentVisits,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppWidgetSummary,
    AppCurrentSubject,
    AppConversionRates,
} from '../sections/@dashboard/app';
import ProfilePhoto from 'src/sections/@dashboard/profile/ProfilePhoto';
import { Icon } from '@iconify/react';
import HRProfilePhoto from 'src/sections/@dashboard/profile/hrprofile';
const UserDets = ({ data }) => {
    const percentage = 66;

    return (
        <div>
            <Profile data={data} />
        </div>
    );
};

export default UserDets;

function Profile({ data }) {
    console.log(data)
    const [basicModal, setBasicModal] = useState(false);
    const [aadhar, setAadhar] = useState(false);
    const [pan, setPan] = useState(false);
    const [clicked, setClicked] = useState(undefined);
    const toggleUpload = (value) => {
        if (value === 'aadhar') {
            setClicked('aadhar');
            toggleShow();
        }
        if (value === 'pan') {
            setClicked('pan');
            toggleShow();
        }
    };
    const getUploadParams = () => {
        return { url: 'https://httpbin.org/post' };
    };

    const handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta);
    };

    const handleSubmit = (files, allFiles, type) => {
        console.log(files[0].meta);
        toggleShow();
        type === 'aadhar' ? setAadhar(true) : setPan(true);
    };

    const toggleShow = () => setBasicModal(!basicModal);
    return (
        <MDBContainer className="">
            <MDBRow>
                <MDBCol>
                    {!JSON.parse(localStorage.getItem('cm_user'))?.isemployee && (
                        <MDBBreadcrumb className="bg-white rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem>
                                <a href="/dashboard/app">Home</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem>
                                <a href="/employee">Employee</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    )}
                </MDBCol>
            </MDBRow>

            <MDBRow>
                <MDBCol lg="4">
                    <MDBCard className="mb-4">
                        <MDBCardBody className="text-center">
                            <HRProfilePhoto url={data?.photo} />
                            <p className="text-muted mb-1">{data?.user.name}</p>
                            <p className="text-muted mb-1">{data?.user.email}</p>
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard className="mb-4">
                        <Grid item xs={12} md={12} lg={12}>
                            <Card>
                                <CardContent>
                                    {
                                        localStorage.getItem('cm_aadhar') ? <CardMedia component='img' image={localStorage.getItem('cm_aadhar')} /> : <Typography>Aadhar Card not verified</Typography>
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg="8">
                    <MDBCard className="mb-4">
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm="5">
                                    <MDBCardText>Position</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7">
                                    <MDBCardText className="text-muted">{data?.user.name === 'Kush' ? 'Waiter' : 'Chef'}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="5">
                                    <MDBCardText>Phone Number</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7">
                                    <MDBCardText className="text-muted">{data?.user.phone_no}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="5">
                                    <MDBCardText>Verified</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7">
                                    <MDBCardText className="text-muted">{`${data?.is_verified}`}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="5">
                                    <MDBCardText>Email</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="7">
                                    <MDBCardText className="text-muted">{data?.user.email}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBRow>
                        <MDBCol md="6">
                            <MDBCard className="mb-4 mb-md-0">
                                <MDBCardBody className="mb-3">
                                    <MDBCardText className="mb-4">
                                        <span className="text-warning font-bold me-1">Performance</span>
                                    </MDBCardText>
                                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>
                                        Punctuality
                                    </MDBCardText>
                                    <MDBProgress className="rounded">
                                        <MDBProgressBar className='bg-success' striped animated width={80} valuemin={0} valuemax={100} />
                                    </MDBProgress>

                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                                        Customer Feedback
                                    </MDBCardText>
                                    <MDBProgress className="rounded">
                                        <MDBProgressBar className='bg-warning' striped animated width={52} valuemin={0} valuemax={100} />
                                    </MDBProgress>

                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                                        Hospitality & Service
                                    </MDBCardText>
                                    <MDBProgress className="rounded">
                                        <MDBProgressBar className='bg-success' striped animated width={99} valuemin={0} valuemax={100} />
                                    </MDBProgress>

                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                                        Knowledge
                                    </MDBCardText>
                                    <MDBProgress className="rounded">
                                        <MDBProgressBar className='bg-warning' striped animated width={56} valuemin={0} valuemax={100} />
                                    </MDBProgress>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>

                        {/* //? View Document Modal */}
                        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
                            <MDBModalDialog centered>
                                <MDBModalContent>
                                    <MDBModalHeader>
                                        <MDBModalTitle>
                                            {clicked === 'aadhar'
                                                ? !aadhar
                                                    ? 'Upload Aadhar Card'
                                                    : 'View Aadhar Card'
                                                : !pan
                                                    ? 'Upload Pan Card'
                                                    : 'View Pan Card'}
                                        </MDBModalTitle>
                                        <MDBBtn className="btn-close" color="none" onClick={toggleShow}></MDBBtn>
                                    </MDBModalHeader>
                                    <MDBModalBody>
                                        {clicked === 'aadhar' ? (
                                            !aadhar ? (
                                                <Dropzone
                                                    getUploadParams={getUploadParams}
                                                    onChangeStatus={handleChangeStatus}
                                                    onSubmit={(files, allfiles) => {
                                                        handleSubmit(files, allfiles, 'aadhar');
                                                    }}
                                                    maxFiles={1}
                                                    multiple={false}
                                                    canCancel={false}
                                                    inputContent="Drop Document"
                                                    styles={{
                                                        dropzone: { width: '100%', height: 200 },
                                                        dropzoneActive: { borderColor: 'grey' },
                                                    }}
                                                />
                                            ) : (
                                                <CardMedia component="img" image={aadhar_uri} />
                                            )
                                        ) : !pan ? (
                                            <Dropzone
                                                getUploadParams={getUploadParams}
                                                onChangeStatus={handleChangeStatus}
                                                onSubmit={(files, allfiles) => {
                                                    handleSubmit(files, allfiles, 'pan');
                                                }}
                                                maxFiles={1}
                                                multiple={false}
                                                canCancel={false}
                                                inputContent="Drop Document"
                                                styles={{
                                                    dropzone: { width: '100%', height: 200 },
                                                    dropzoneActive: { borderColor: 'grey' },
                                                }}
                                            />
                                        ) : (
                                            <CardMedia component="img" image={pan_uri} />
                                        )}
                                    </MDBModalBody>
                                </MDBModalContent>
                            </MDBModalDialog>
                        </MDBModal>

                        <MDBCol md="6">
                            <MDBCard className="mb-4 mb-md-0">
                                <MDBCardBody className="mb-3">
                                    <MDBCardText className="mb-4">
                                        <span className="text-warning font-italic me-1">Past Work Experience</span>
                                    </MDBCardText>
                                    <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>
                                        {data?.user.name === 'Kushh' ? "Mc'Donalds" : data?.user.name === 'Urmi' ? "GrandMama's" : "Radha Krishna"}
                                    </MDBCardText>
                                    <MDBProgress className="rounded">
                                        <MDBProgressBar className='bg-success' striped animated width={80} valuemin={0} valuemax={100} />
                                    </MDBProgress>

                                    <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                                        Prithvi Cafe
                                    </MDBCardText>
                                    <MDBProgress className="rounded">
                                        <MDBProgressBar className='bg-warning' striped animated width={62} valuemin={0} valuemax={100} />
                                    </MDBProgress>


                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
