/* eslint-disable */
import React, { useState } from 'react';
import { CardMedia } from '@mui/material';
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
const ProfilePage = () => {
  const percentage = 66;

  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfilePage;

function Profile() {
  const [basicModal, setBasicModal] = useState(false);
  const [aadhar, setAadhar] = useState(false);
  const [pan, setPan] = useState(false);
  const [clicked, setClicked] = useState(undefined);
  const aadhar_uri =
    'https://legaldbol.com/wp-content/uploads/2019/03/27-Creative-Aadhar-Card-Template-Download-Download-for-Aadhar-Card-Template-Download.jpg';
  const pan_uri = 'https://www.thestatesman.com/wp-content/uploads/2019/07/pan-card.jpg';
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

  const handleSubmit = (files, allFiles) => {
    console.log(files[0].file);
  };

  const toggleShow = () => setBasicModal(!basicModal);
  return (
    <MDBContainer className="">
      <MDBRow>
        <MDBCol>
          <MDBBreadcrumb className="bg-white rounded-3 p-3 mb-4">
            <MDBBreadcrumbItem>
              <a href="/dashboard/app">Home</a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem>
              <a href="/employee">Employee</a>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </MDBCol>
      </MDBRow>

      <MDBRow>
        <MDBCol lg="4">
          <MDBCard className="mb-4">
            <MDBCardBody className="text-center">
              <ProfilePhoto />
              <p className="text-muted mb-1">Full Stack Developer</p>
              <p className="text-muted mb-1">Bay Area, San Francisco, CA</p>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="mb-4">
            <Grid item xs={12} md={6} lg={4}>
              <AppTrafficBySite
                title="Indentity"
                list={[
                  {
                    name: 'Aadhar',
                    icon: aadhar ? (
                      <img
                        src={'https://www.pngkey.com/png/detail/224-2240746_aadhaar-logo-aadhar-card-logo-png.png'}
                        style={{ width: 80, height: 60, borderRadius: 10 }}
                        onClick={() => {
                          toggleUpload('aadhar');
                        }}
                      />
                    ) : (
                      <Icon
                        onClick={() => {
                          toggleUpload('aadhar');
                        }}
                        icon="solar:upload-line-duotone"
                        color="#fc8019"
                        width="30"
                        height="30"
                      />
                    ),
                  },
                  {
                    name: 'Pan',
                    icon: pan ? (
                      <img
                        src={'https://sarkariyojnaa.com/wp-content/uploads/2018/09/pan-card-agency-500x500.png'}
                        style={{ width: 80, height: 60, borderRadius: 10 }}
                        onClick={() => {
                          toggleUpload('pan');
                        }}
                      />
                    ) : (
                      <Icon
                        onClick={() => {
                          toggleUpload('pan');
                        }}
                        icon="solar:upload-line-duotone"
                        color="#fc8019"
                        width="30"
                        height="30"
                      />
                    ),
                  },
                ]}
              />
            </Grid>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Full Name</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">Johnatan Smith</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Email</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">example@example.com</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Mobile</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Address</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>

          <MDBRow>
            <MDBCol md="6">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody className="mb-3">
                  <MDBCardText className="mb-4">
                    <span className="text-primary font-bold me-1">Performance</span>
                  </MDBCardText>
                  <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>
                    Web Design
                  </MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar striped animated width={80} valuemin={0} valuemax={100} />
                  </MDBProgress>

                  <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                    Website Markup
                  </MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar striped animated width={72} valuemin={0} valuemax={100} />
                  </MDBProgress>

                  <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                    One Page
                  </MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar striped animated width={89} valuemin={0} valuemax={100} />
                  </MDBProgress>

                  <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                    Mobile Template
                  </MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar striped animated width={55} valuemin={0} valuemax={100} />
                  </MDBProgress>

                  <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                    Backend API
                  </MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar striped animated width={66} valuemin={0} valuemax={100} />
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
                          onSubmit={handleSubmit}
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
                        onSubmit={handleSubmit}
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
                    <span className="text-primary font-italic me-1">assigment</span> Project Status
                  </MDBCardText>
                  <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>
                    Web Design
                  </MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar striped animated width={80} valuemin={0} valuemax={100} />
                  </MDBProgress>

                  <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                    Website Markup
                  </MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar striped animated width={72} valuemin={0} valuemax={100} />
                  </MDBProgress>

                  <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                    One Page
                  </MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar striped animated width={89} valuemin={0} valuemax={100} />
                  </MDBProgress>

                  <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                    Mobile Template
                  </MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar striped animated width={55} valuemin={0} valuemax={100} />
                  </MDBProgress>

                  <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                    Backend API
                  </MDBCardText>
                  <MDBProgress className="rounded">
                    <MDBProgressBar striped animated width={66} valuemin={0} valuemax={100} />
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
