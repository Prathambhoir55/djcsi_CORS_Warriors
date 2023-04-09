import httpCommon from '../http-common';

const getEmpUser = () => {
  return httpCommon.get('/company/get-empuser/', {
    headers: {
      Authorization: `Token  ${JSON.parse(localStorage.getItem('cm_token'))}`,
      'Content-Type': 'application/json',
    },
  });
};

export default { getEmployees };
