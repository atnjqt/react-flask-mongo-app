import React from 'react'
import { Image } from 'react-bootstrap';

const Picture = ({name, user_id, ...props}) => {
    const { width, is_silhouette, url, height} = props.feed
    let post;

    post = (
        <div class='prof_pic'>

            <Image src={url} 
                width={width}
                height={height}
                roundedCircle
                 />

            <body><strong>{name}</strong></body>
        </div>
    );

    return (
        <React.Fragment>
            {post}
        </React.Fragment>
    );
}

export default Picture;