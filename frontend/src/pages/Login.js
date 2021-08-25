export default function Login({user}){
    return <div>{user ? user.name : 'Not Logged'}</div>
}