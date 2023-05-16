import httpLocal from "../http-local";

const scanimg = (data) => {
    return httpLocal.post('/face-detect/', data)
}

export default { scanimg }