// function PostCard(post){
//     const {image, description, category} = post;
   
//     return (
//     <div>
//         <div>
//             <img className="card-img" src={image} alt={category}/>
//             <h5 className="grid2">{description}</h5>
            
//             <h6 className="grid3">${category}</h6>       
//         </div>  
//      </div>

//     )
// }

// export default PostCard

import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function PostCard(post) {
    const {image, description, category} = post;
    return (
    <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
      {/* {post.map((post) => ( */}
          <ImageListItem key={image}>
            <img
              src={`${image}?w=248&fit=crop&auto=format`}
              srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={description}
              loading="lazy"
            />
            <ImageListItemBar position="below" title={description}/>
          </ImageListItem>
      </ImageList>
    </Box>
    );
}