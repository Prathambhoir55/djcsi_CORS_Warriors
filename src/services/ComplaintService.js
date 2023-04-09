/* eslint-disable*/
import httpCommon from '../http-common';

const getEmployees = () => {
  return httpCommon.get('/company/all-emp/', {
    headers: {
      Authorization: `Token  ${localStorage.getItem('cm_token')}`,
      'Content-Type': 'application/json',
    },
  });
};

export default { getEmployees };
