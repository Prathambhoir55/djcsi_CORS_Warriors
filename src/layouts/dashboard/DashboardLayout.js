/* eslint-disable */
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
//
import Header from './header';
import Nav from './nav';

// ----------------------------------------------------------------------
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { TextField } from '@mui/material';
import ComplaintService from 'src/services/ComplaintService';
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  useEffect(() => {
    const funct = async () => {
      await ComplaintService.getEmployees().then((res) => {
        console.log(res);
      });
    };
    funct();
  }, []);

  const [topRightModal, setTopRightModal] = useState(false);
  const toggleShow = () => setTopRightModal(!topRightModal);
  const handleSubmitTicket = async () => {
    toggleShow();
    await ComplaintService.postComplaint(json)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJson({ ...json, [name]: value });
  };
  const [json, setJson] = useState({
    issued_for: '',
    text: '',
    is_resolved: false,
  });

  return (
    <StyledRoot>
      {!JSON.parse(localStorage.getItem('cm_user'))?.isemployee && (
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      )}
      <Main>
        <Outlet />
      </Main>
      {JSON.parse(localStorage.getItem('cm_user'))?.isemployee && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={toggleShow}
          style={{ position: 'fixed', margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto' }}
        >
          <HelpOutlineIcon fontSize="large" />
        </Fab>
      )}

      <MDBModal animationDirection="right" show={topRightModal} tabIndex="-1" setShow={setTopRightModal}>
        <MDBModalDialog position="top-right" side>
          <MDBModalContent>
            <MDBModalHeader className="bg-warning text-white">
              <MDBModalTitle>Raise a Ticket</MDBModalTitle>
              <MDBBtn color="none" className="btn-close btn-close-white" onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <TextField label="Phone Number" sx={{ width: '100%' }} value={json.issued_for} name="issued_for" onChange={handleChange} />
              <hr />
              <TextField
                sx={{ width: '100%', height: 'auto' }}
                multiline
                rows={10}
                onChange={handleChange}
                name="text"
                value={json.text}
                label="Descibe your complaint"
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="warning" onClick={handleSubmitTicket}>
                Submit Ticket
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </StyledRoot>
  );
}
