import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation} from 'react-router-dom';
import '../navbar/navbar.css'

export default function Navbar() {
    const [favoriteCitiesList,setFavoriteCitiesList] = useState(null)
    const local = useLocation()
    
    useEffect(()=>{
        if(local.state === null){
            console.log('i am null')
        }else{
            console.log(local.state)
            setFavoriteCitiesList(local.state.data)
        }
    },[local.state])
    return (
        <div className='body'>
            <div className='navbarContainer'>
                <h2>World-Weather</h2>
                <ul className='ulNavbar'>
                    <li className='liNavBar'><Link state={{data:favoriteCitiesList}}  className='linkNavbar' to="/">Home</Link></li>
                    <li className='liNavBar'><Link state={{ data:favoriteCitiesList }} className='linkNavbar' to="about">Favorite</Link></li>
                </ul>

            </div>
            <Outlet />
        </div>



    )
}