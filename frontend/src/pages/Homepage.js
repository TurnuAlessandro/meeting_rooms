export default function Homepage({user}){
    return <div>{user ? user.name : 'Home Page'}</div>
}