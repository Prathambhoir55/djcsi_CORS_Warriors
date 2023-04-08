/* eslint-disable */
import React from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};
const privkey = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDBeqS2W/o+hdsBNyPvH1CDDN0vFj5B2O+0tVKEj/zFgB9b+UGg
hhEF8yyhGJLwK4Vena5JyoGaaRVSHFD+eBaDFNssOy6BVYrKsQDK3EdgaBH5VuTO
MlOxhgBEYt16qqfSU9NyG8+loMc2UNsEfILWGLz17OWSJcgp99CPMNcrvQIDAQAB
AoGBALI/pWQEVQYpF92EyWxR80DpJxVsbqsHi792lbFfXkcuhLWda+LR4PkUUfeQ
xj7SOaszphCBqulxCp19TPlD9aftHTn+MRbzhMdgME7OQ79ek0RF9H5AjgK21urY
CNGuF+obxAbdmZgskrqqCecRUZ6liFq7fMZU2pjPqlwQulzZAkEA+sFdKffqKyzz
b92I9IyoQVyH+bdnM77ODZ2YebZ04jUq+YLC/mtKqQCvoDssCfzPWoKOrGbdKxHL
UPufkdnZBwJBAMWGmfXEhbpspsVMZ/6Y64M9JKqfAb1pkVsOE8kd5BR404R8NXAr
wun1OEGJASD4JixYEJ8xM4snvTOaD6dOeBsCQQDZ/+GO6wmaH6pERsUaVm6w5FES
uG/wfKGHFMvKhOV5A+Aoq5X6uixeYUpOcyMGS9O5TGfdWlBNcVrhPOCtXEdhAkBo
+quy6hqkxQAxlfUjZASvgHyPTejv0T6WpTmwxvkkRD8uh5EjJ671BwY6FmWKLzii
kr9qzAx35cvxs+yj39mHAkBC3vl1oAT46uTANQQhvYZcs1e3/3md2Sy0IiEaARs9
JBII28RfXKdnxwdZbUDm729VdrGL7L0hNYEGA2BQPS5m
-----END RSA PRIVATE KEY-----`;

const pubkey = `----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBeqS2W/o+hdsBNyPvH1CDDN0v
Fj5B2O+0tVKEj/zFgB9b+UGghhEF8yyhGJLwK4Vena5JyoGaaRVSHFD+eBaDFNss
Oy6BVYrKsQDK3EdgaBH5VuTOMlOxhgBEYt16qqfSU9NyG8+loMc2UNsEfILWGLz1
7OWSJcgp99CPMNcrvQIDAQAB
-----END PUBLIC KEY-----`;
const InterviewBL = () => {
  const handleImageClick = (imageSrc) => {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pubkey);
    var encrypted = encrypt.encrypt(imageSrc);
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privkey);
    var uncrypted = decrypt.decrypt(encrypted);
    if (uncrypted == imageSrc) {
      console.log('Success');
    } else {
      console.log('Fail');
    }
  };

  return (
    <Webcam audio={false} height={720} screenshotFormat="image/jpeg" width={1280} videoConstraints={videoConstraints}>
      {({ getScreenshot }) => (
        <button
          onClick={() => {
            const imageSrc = getScreenshot();
            console.log(imageSrc);
          }}
        >
          Capture photo
        </button>
      )}
    </Webcam>
  );
};

export default InterviewBL;
