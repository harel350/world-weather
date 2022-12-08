import '../weatherCard/weatherCard.css'

export default function WeatherCard({weatherData,showNight,isCelsius}:{weatherData:any,showNight?:boolean,isCelsius?:boolean}) {
   console.log('render',isCelsius)
    let isNight = showNight
    const {Temperature,Day,Night,Date} = weatherData[0]
    let temp,icon,iconPhrase;
    let date = [...Date].splice(0,10)
    if(isNight){
        temp = Temperature.Minimum.Value
        icon = Night.Icon;
        iconPhrase = Night.IconPhrase
        
    }
    else{
        temp = Temperature.Maximum.Value
        icon = Day.Icon;
        iconPhrase = Day.IconPhrase
    }
    function FahrenheitToCelsius(temperature:any){
      
        return ((temperature - 32) * 5/9).toFixed(0)
    }
    if(isCelsius){
        temp = FahrenheitToCelsius(temp)
    }

    
    if(icon<10){
        icon='0'+icon
    }
    return (
        <div className='weatherCardContainer'>
            <div className='dayTempContainer'>
                <h2>{isNight ? 'Night' :'Day'}</h2>
                <div className="tempContainer">
                    <p className='temp'>{temp}<sup>o</sup></p>
                </div>
            </div>
            <div className="imageContainer">
                <img className='iconImg' src={`https://developer.accuweather.com/sites/default/files/${icon}-s.png`} alt="" />
            </div>
            <div className='iconTitleDateContainer'>
                <h4 className="iconTitle">{iconPhrase}</h4>
                <div className="dateContainer">
                    <h4 className="date">{date}</h4>
                </div>
            </div>
        </div>
    )
}