import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Picture from './Picture'

import './FacebookFriends.css'

const FacebookFriends = ({user_id, name, width, height,  token, ...props}) => {
    const [pics, setPicsData] = useState([]);

    //use useRef to store the latest value of the prop without firing the effect
    const tokenProp = useRef(token);
    tokenProp.current = token;

    useEffect(() => {
        // this is to avoid memory leaks
        const abortController = new AbortController();

        async function fetchFacebookPicture () {
          try{
            axios
                .get(`https://graph.facebook.com/${user_id}/picture?type=large&width=${width}&height=${height}&redirect=0&access_token=${tokenProp.current}`)
                .then((resp) => {
                    setPicsData(resp.data.data)
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
            <Picture key={pics.id} name={name} user_id={user_id} feed={pics} />
        </div>
    );
}

export default FacebookFriends;