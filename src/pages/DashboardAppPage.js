/* eslint-disable */
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';

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
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import ProfilePage from './ProfilePage';
import ComplaintService from 'src/services/ComplaintService';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.setItem('cm_user', null);
    navigate('/signup', { replace: true });
  };
  useEffect(() => {
    const funct = async () => {
      await ComplaintService.getComplaints().then((res) => {
        console.log(res);
      });
    };
    funct();
  }, []);

  useEffect(() => {
    JSON.parse(localStorage.getItem('cm_user')) ? navigate('/dashboard/app') : navigate('/signup');
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard | CheckMate UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>
          <Button onClick={handleLogOut} target="_blank" variant="outlined" style={{ height: 40, width: 80 }}>
            Logout
          </Button>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            {JSON.parse(localStorage.getItem('cm_user'))?.isemployee && <ProfilePage />}
          </Grid>
          {!JSON.parse(localStorage.getItem('cm_user'))?.isemployee && (
            <Grid item xs={12} md={6} lg={12}>
              <AppWebsiteVisits
                title="Avg. Monthly Ratings"
                subheader="(+43%) than last year"
                chartLabels={[
                  '05/01/2022',
                  '06/01/2022',
                  '07/01/2022',
                  '08/01/2022',
                  '09/01/2022',
                  '10/01/2022',
                  '11/01/2022',
                  '12/01/2022',
                  '01/01/2023',
                  '02/01/2023',
                  '03/01/2023',
                ]}
                chartData={[
                  {
                    name: 'Branch A',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 22, 44, 22, 30],
                  },
                  {
                    name: 'Branch B',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: 'Branch C',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ]}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Conflicts"
              list={[
                {
                  title: "Conflict between 'Urmi' and 'Kush'",
                  description: 'Conflict Description',
                  postedAt: faker.date.recent(),
                },
                {
                  title: "Conflict between 'Urmi' and 'Pratham'",
                  description: 'Conflict Description',
                  postedAt: faker.date.recent(),
                },
                {
                  title: "Conflict between 'Urmi' and 'Khushias'",
                  description: 'Conflict Description',
                  postedAt: faker.date.recent(),
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Work Experiences "
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: ['McDonalds', 'Prithvi Cafe', 'Tea Villa Cafe', 'Olive Cafe', 'Jamjar Cafe'][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
