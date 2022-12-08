import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import SearcBar from "../../components/searchBar/searchBar"
import WeatherCard from '../../components/weatherCard/weatherCard'
import '../homePage/homePage.css'

export default function HomePage() {
    const [searchData, setSearchData] = useState([])
    const [isCelsius, setIsCelsius] = useState(true)
    const [favoriteCitylist, setFavoriteCitylist] = useState<any>([])
    const [cityName, setCityName] = useState<{ cityName: string, cityKey: string }>({ cityName: '', cityKey: '' })
    const local = useLocation()
    useEffect(() => {
        if (local.state!== null) {
            if(local.state.data===null){
                setFavoriteCitylist([])
            }else{
                setFavoriteCitylist(local.state.data)
            }
           
        }
        console.log(local.state)
    }, [local.state])
    const navigate = useNavigate();
    function addFavoriteHandle() {
        let newFavoriteCity = { cityName: cityName, cityData: searchData }
        let newFavoriteCityList = [...favoriteCitylist]
        let isCityExsist = newFavoriteCityList.find(item => item.cityName.cityKey === cityName.cityKey)
        if (isCityExsist === undefined) {
            newFavoriteCityList.push(newFavoriteCity)
        }
        setFavoriteCitylist(newFavoriteCityList)
        navigate('/', { state: { data: newFavoriteCityList } })

    }


    return (
        <div className="homePageContainer">
            <SearcBar
                cityName={(city: any) => setCityName(city)}
                onSearch={(data: []) => { setSearchData(data) }} />
            {
                searchData.length > 0 &&
                <>
                    <div className="btnCFcontainer">
                        <button onClick={() => setIsCelsius(true)} className="CFbutton" style={{ background: isCelsius ? 'green' : 'unset' }}>Celsius</button>
                        <button onClick={() => setIsCelsius(false)} className="CFbutton" style={{ background: isCelsius ? 'unset' : 'green' }}>Fahrenheit</button>
                    </div>
                    <WeatherCard weatherData={searchData} isCelsius={isCelsius} />
                    <WeatherCard weatherData={searchData} showNight isCelsius={isCelsius} />
                    <button className="btn" onClick={addFavoriteHandle}>Add {cityName.cityName} to favorite city</button>
                </>

            }


        </div>
    )
}