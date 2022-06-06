import React from 'react'
import { Image } from 'react-bootstrap';

const Photos = ({ ...props}) => {
    const { height, source, width} = props.feed
    let post;

    post = (
        <div class='prof_pic'>

            <Image src={source} 
                width='300'
                height='300'
                 />

        </div>
    );

    return (
        <React.Fragment>
            {post}
        </React.Fragment>
    );
}

export default Photos;