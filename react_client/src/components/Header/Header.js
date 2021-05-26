// custom hooks
import { useLogOff } from '../../hooks';
import { useSelector } from 'react-redux'

export default function Header() {

    let username = useSelector(state => state.userInfo.name);
    if(!username && localStorage.getItem('token')) {
        username = JSON.parse(localStorage.getItem('token'))?.name
    }
    // log off hook
  const { logOff } = useLogOff();
    return (
        
        <nav className="navbar justify-content-between navbar-light bg-light">
            <h3>Covid Sayler, {username}</h3>
            <button className="btn btn-outline-success my-2 my-sm-0" onClick={ logOff }>Logout</button>
        </nav>
    )
}