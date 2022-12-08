import { useEffect, useState } from "react"
import WeatherCard from "../../components/weatherCard/weatherCard"
import { useLocation } from "react-router-dom"
import '../favoritePage/favoritePage.css'
export default function FavoritePage() {
    const [favoriteCitiesList, setFavoriteCitieslist] = useState<any>([])
    const local = useLocation()
    console.log(local)
    useEffect(() => {
        if (local.state.data === null) {
            console.log('is null')
        } else {

            setFavoriteCitieslist(local.state.data)
        }

    }, [local.state])


    // console.log('local.state.data',local.state.data)
    // const {favoriteData} = local.state.data
    // setFavoriteCitylist(favoriteData[0].cityData)

    return (
        <div className="favoritePageContainer">
            {
                favoriteCitiesList.length > 0 &&
                favoriteCitiesList.map((item: any) => {
                    return (
                       <FavoriteCard key={item.cityName.cityKey} item={item}/>



                    )
                })
            }

        </div>
    )
}

function FavoriteCard({item}:{item:any}) {
    return (
        <div className="favoriteCardContainer">
            <div className="cityNaneContainer" >
                <h2>City name: {item.cityName.cityName}</h2>
                <h4>City ID: {item.cityName.cityKey}</h4>
            </div>
            <div className="weatherContainer">
                <WeatherCard weatherData={item.cityData} isCelsius />
                <WeatherCard weatherData={item.cityData} showNight isCelsius />
            </div>
        </div>
    )
}