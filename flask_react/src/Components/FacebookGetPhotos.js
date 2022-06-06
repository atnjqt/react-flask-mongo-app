import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

//import Feed from './Feed'
import FacebookPhotos from './FacebookPhotos'

import './FacebookFriends.css'

const FacebookGetPhotos = ({token, ...props}) => {
    const [getphotos, setGetPhotosData] = useState([]);
    //use useRef to store the latest value of the prop without firing the effect
    const tokenProp = useRef(token);
    tokenProp.current = token;
    console.log(tokenProp.current)

    useEffect(() => {
        // this is to avoid memory leaks
        const abortController = new AbortController();

        async function fetchFacebookGetPhotos () {
          try{
            axios
                .get(`https://graph.facebook.com/me/photos?fields=images&type=uploaded&access_token=${tokenProp.current}`)
                .then((resp) => {
                    console.log('TESTING to get photo IDs....')
                    console.log(resp)
                    setGetPhotosData(resp.data.data)
                })
          } catch (err) {
              console.log('error', err)
          }
        }

        // manually call the fecth function 
        fetchFacebookGetPhotos();
  
        return () => {
            // cancel pending fetch request on component unmount
            abortController.abort(); 
        };
    }, [props.limit])

    return (
        // for each friend, displays using the FacebookPicture Component
        <div className="container">
            {getphotos.map((feed) => (
                <FacebookPhotos photo_id={feed.id} token={token}/>
            ))}
        </div>
    );
}

export default FacebookGetPhotos;