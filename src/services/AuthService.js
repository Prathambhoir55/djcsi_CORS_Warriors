import httpCommon from "../http-common"

const hrregister = (data) => {
    return httpCommon.post('/company/hr-register/', data)
}

const empregister = (data) => {
    return httpCommon.post('/company/emp-register/', data)
}

export default {
    hrregister,
    empregister
}