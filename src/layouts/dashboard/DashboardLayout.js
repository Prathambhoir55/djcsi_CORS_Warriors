/* eslint-disable */
import { useState } from 'react';
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
  const [topRightModal, setTopRightModal] = useState(false);
  const handleSubmitTicket = () => {
    console.log('Ticket Submitted');
  };
  const toggleShow = () => setTopRightModal(!topRightModal);
  const [open, setOpen] = useState(false);

  return (
    <StyledRoot>
      {!JSON.parse(localStorage.getItem('cm_user'))?.isemployee && (
        <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      )}
      <Main>
        <Outlet />
      </Main>
      <Fab
        color="primary"
        aria-label="add"
        onClick={toggleShow}
        style={{ position: 'fixed', margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto' }}
      >
        <HelpOutlineIcon fontSize="large" />
      </Fab>

      <MDBModal animationDirection="right" show={topRightModal} tabIndex="-1" setShow={setTopRightModal}>
        <MDBModalDialog position="top-right" side>
          <MDBModalContent>
            <MDBModalHeader className="bg-info text-white">
              <MDBModalTitle>Raise a Ticket</MDBModalTitle>
              <MDBBtn color="none" className="btn-close btn-close-white" onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <hr />
              <TextField
                sx={{ width: '100%', height: 'auto' }}
                multiline
                rows={10}
                name="Description"
                label="Descibe your complaint"
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="info" onClick={handleSubmitTicket}>
                Submit Ticket
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </StyledRoot>
  );
}
