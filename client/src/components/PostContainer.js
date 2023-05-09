import PostCard from "./PostCard"

function PostContainer({allPosts}){
    

let postList = allPosts.map(item => (<PostCard key={item.id} {...item} />))

return (
    <div>
        <h1></h1>
        <div className="container">
            {postList}
        </div>
    </div>

 )   
}

export default PostContainer
