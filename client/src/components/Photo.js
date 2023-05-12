import React, { useState, useEffect } from 'react';
import { createClient } from 'pexels';


function Photo() {
    const [images, setImages] = useState([]);
    
    const client = createClient('Ej4J1B28dAUDxaKijXE9k5dBz4PdA23THvPeXnTslHd23fmNhDZL8Vff')
    
    useEffect(() => {
        setImages(client.photos)
    },[client.photos]);

    return (
        <div>
        {images.map((image) => (
        <img src={image.url} key={image.id} alt={image.alt}/>
        ))}
        </div>
    );
}

export default Photo;