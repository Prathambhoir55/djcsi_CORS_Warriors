/* eslint-disable */
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

import React, { useState, useEffect } from 'react';

const ProfilePhoto = () => {
  const rating = 8;
  const [pathColor, setpathColor] = useState('#ffbb00');

  useEffect(() => {
    console.log(pathColor);
    if (rating >= 8) {
      setpathColor('#7dfc03');
    } else if (rating < 8 && rating >= 7) {
      setpathColor('#defe01');
    } else if (rating < 6 && rating >= 4) {
      setpathColor('##ffbb00');
    } else if (rating < 4 && rating >= 2) {
      setpathColor('#ff6d00');
    } else if (rating < 2 && rating >= 0) {
      setpathColor('#c61f00');
    }
  }, [rating, pathColor]);

  const percentage = rating * 10;
  const green = 10 - rating;
  const red = rating - 0;
  return (
    <div style={{ height: 150, width: 150, display: 'inline-block', marginBottom: '20px' }}>
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          rotation: 0.25,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'round',
          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,
          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',
          // Colors
          pathColor: pathColor,
          textColor: '#f88',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      >
        {/* //? Profile Photo */}
        <img style={{ width: '70px', height: '70px', borderRadius: '50%', marginTop: -5 }} src="https://firebasestorage.googleapis.com/v0/b/codesashtra.appspot.com/o/images%2FWIN_20230409_16_05_04_Pro.jpg%20%2B%203d5d1f0a-e8ec-48f9-abfa-a71ca7bff81e?alt=media&token=268a6470-1ca8-4517-b3cc-7a0775dd1305" alt="doge" />
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default ProfilePhoto;
