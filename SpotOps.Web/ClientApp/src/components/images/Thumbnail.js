import React from 'react'
import { useState, useEffect } from 'react'

const Thumbnail = ({ file, url }) => {

    const [thumb, setThumb] = useState(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        if (url) {
            setThumb(url);
            setLoading(false);
        } else if (file) {
            //do something with file object...
            setLoading(false);
        } 
    }, [url, file])

    return (
        <>
        { loading ? <p></p> : 
            <img   
                src={thumb || ''}
                alt={(file && file.name) || ''}
                className="img-thumbnail mt-2"
                height={500}
                width={500}
            />
        }
        </>        
    )
}


export default Thumbnail;