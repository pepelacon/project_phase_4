import FriendCard from "./FriendCard"

function ListOfFriends(){
    

let postList = allPosts.map(item => (<FriendCard key={item.id} {...item} />))

return (
    <div>
        <h1>hello????</h1>
        <div className="container">
            {postList}
        </div>
    </div>

 )   
}

export default PostContainer