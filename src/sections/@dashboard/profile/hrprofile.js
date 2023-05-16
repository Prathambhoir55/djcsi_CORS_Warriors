/* eslint-disable */
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

import React, { useState, useEffect } from 'react';

const HRProfilePhoto = ({ url }) => {
    const rating = 8;
    const [pathColor, setpathColor] = useState('#ffbb00');

    useEffect(() => {
        console.log(pathColor);
        if (rating >= 8) {
            setpathColor('#7dfc03');
        } else if (rating < 8 && rating >= 6) {
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
                <img style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '50%' }} src={url} alt="doge" />
            </CircularProgressbarWithChildren>
        </div>
    );
};

export default HRProfilePhoto;