function PostCard(post){
    const {image, description, category} = post;
   
    return (
    <div>
        <div>
            <img className="card-img" src={image} alt={category}/>
            <h5 className="grid2">{description}</h5>
            
            <h6 className="grid3">${category}</h6>       
        </div>  
     </div>

    )
}

export default PostCard