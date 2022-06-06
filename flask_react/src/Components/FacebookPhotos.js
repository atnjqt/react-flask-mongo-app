import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Photos from './Photos'

//import './FacebookFriends.css'

const FacebookPhotosSrc = ({photo_id, token, ...props}) => {
    const [photos, setPhotosData] = useState([]);

    //use useRef to store the latest value of the prop without firing the effect
    const tokenProp = useRef(token);
    tokenProp.current = token;

    useEffect(() => {
        // this is to avoid memory leaks
        const abortController = new AbortController();

        async function fetchFacebookPicture () {
          try{
            axios
                .get(`https://graph.facebook.com/${photo_id}/?access_token=${token}&fields=webp_images`)
                .then((resp) => {
                    console.log('TESTING FOR PHOTOS DISPLAY')
                    console.log(resp.data)
                    // take only first of the various different image sizes turned
                    setPhotosData(resp.data.webp_images[0])
                })
          } catch (err) {
              console.log('error', err)
          }
        }

        // manually call the fecth function 
        fetchFacebookPicture();
  
        return () => {
            // cancel pending fetch request on component unmount
            abortController.abort(); 
        };
    }, [props.limit])

    return (
        // display profile picture using the Picture Component
        <div className="container">
            <Photos feed={photos} />
        </div>
    );
}

export default FacebookPhotosSrc;