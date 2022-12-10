import { useState } from "react"
import { Autocomplete, TextField } from '@mui/material'
import '../searchBar/searchBar.css'
const api_key = 'PfnHyUCGltTCWP2yGhTIYUKm0S0X8vNw'
export default function SearchBar({ onSearch, cityName }: { cityName: Function, onSearch: Function }) {
    const [city, setCity] = useState('')
    const [autoCompleteOption, setAutoCompleteOption] = useState([{ city: '', county: '' }])
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
                setCity('')
                setAutoCompleteOption([])
                onSearch(data.DailyForecasts)
            })

        //onSearch()
    }
    function searchHandle(e: any) {
        let search = e.target.value
        search = search.charAt(0).toUpperCase() + search.slice(1)
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${api_key}&q=${search}`)
            .then(resData => resData.json())
            .then(data => {
                let option = data.map((item: any) => { return { city: item.LocalizedName, county: item.Country.LocalizedName } })
                option.splice(0, 5)
                console.log(option)
                setAutoCompleteOption(option)
            })

        setCity(search)
    }

    return (
        <div className="searchBarConatiner">
            <input
            placeholder="Please enter city name"
             className="inputSearchBar"
              value={city}
               onChange={(e)=>searchHandle(e)} 
               list="test" type="search" />
            <datalist id="test">
                {
                   autoCompleteOption.map((item,index) => {
                    return(
                        <option key={index+item.city+item.county} value={item.city}>{`${item.city}   - ${item.county}`}</option>
                    )
                   }) 
                }
            </datalist>

            <button className="btn" onClick={onSearchHandle}>Search</button>
            <AutoCompleteList />
        </div>
    )
}

function AutoCompleteList() {
    return (
        <div>

        </div>

    )
}