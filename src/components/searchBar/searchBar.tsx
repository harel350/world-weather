import { useState } from "react"
import '../searchBar/searchBar.css'
const api_key = 'BoRcyk8A3hTG1vEodG83tqP2W70HuG8u'
export default function SearchBar({ onSearch, cityName }: { cityName: Function, onSearch: Function }) {
    const [city, setCity] = useState('')
    async function onSearchHandle() {

        fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${api_key}&q=${city}`)
        .then(resData => resData.json())
        .then(data => {
            cityName({ cityKey: data[0].Key, cityName: city })
            return fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${data[0].Key}?apikey=${api_key}`)
        })
        .then(resData => resData.json())
        .then(data => {
            console.log(data.DailyForecasts)
            onSearch(data.DailyForecasts)
        })

        //onSearch()
    }
    function searchHandle(e:any){
    
        let search = e.target.value
        search = search.charAt(0).toUpperCase() + search.slice(1)
        setCity(search)
    }
    return (
        <div className="searchBarConatiner">
            <input
                placeholder="Please enter city name"
                className="inputSearchBar"
                type="text"
                value={city}
                onChange={(e)=>searchHandle(e)} />
            <button className="btn" onClick={onSearchHandle}>Search</button>
        </div>
    )
}