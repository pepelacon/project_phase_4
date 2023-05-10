import PostCard from "./PostCard"
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import ImageListItemBar from '@mui/material/ImageListItemBar';


function PostContainer({allPosts}){
    
console.log(allPosts);
// let postList = allPosts.map(item => (<PostCard key={item.id} {...item} />))
let postList = allPosts.map((item) => (console.log(item),
                <ImageListItem key={item.id}>
                    <img
                    src={`${item.image}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                    />
                    {/* <ImageListItemBar position="below" id='photo-desc' title={item.title} /> */}
                    {/* <ImageListItemBar  actionPosition="right" id='photo-desc' subtitle={item.title} />
                     */}
                     <ImageListItemBar
                            sx={{
                                background:
                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            }}
                            title={item.title}
                            position="top"
                            actionIcon={
                                <IconButton
                                sx={{ color: 'white' }}
                                aria-label={`star ${item.title}`}
                                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
                   
                </ImageListItem>
                ))

return (
   
         <div id='all-posts'>
                <Box sx={{overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={4} gap={8}>
                    {postList}
                </ImageList>
                </Box>
            </div>
    
 )   
}

export default PostContainer
