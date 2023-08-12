import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

    const [isMenuVisible, setMenuVisible] = useState(true);
    const [adminMenu, setAdminMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() =>{

        console.log(location)

        if(location.pathname === '/register' || location.pathname === '/login'){
            setMenuVisible(false);
        }else{
            const username = localStorage.getItem('username') != null?localStorage.getItem('username').toString() :('');
            if(username == ''){
                navigate('/login')
            }
            setMenuVisible(true);
            const role = localStorage.getItem('role') != null?localStorage.getItem('role').toString() :('');

            if(role == 'admin'){
                setAdminMenu(true);
            }else{
                setAdminMenu(false);
            }
        }

    },[location])


    return (<>
        <div>
            {
                isMenuVisible &&
                <div className="App-header">
                    <Link to="/">Home</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/customer">Customer</Link>
                    {adminMenu && <Link to="/user">Users</Link>}
                    <Link style={{ float: 'right' }} to="/login">Logout</Link>
                </div>
            }
        </div>

    </>);
}

export default Navbar;