import httpCommon from "../http-common";

const block = (data) => {
    return httpCommon.post('/blackflag/post/', data,
        {
            headers: {
                'Authorization': `Token ${localStorage.getItem('cm_token')}`,
                'Content-Type': 'application/json'
            }
        })
}

export default { block }