/* eslint-disable */
import { v4 as uuidv4 } from 'uuid';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "../firebase/config"

export const upload = (imageUpload) => {
    let url = ''
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name} + ${uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url2) => {
            url = url2
        });
    });
    return url
}

