import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import Header from "./Header";
// import dummy from "../DB/data.json";

export default function DayList(){
    //console.log(dummy);
    //const [days, setDays] = useState([]);
    //const [count, setCount]= useState(0);
    const selectedCountry = useParams().eng;
    console.log(selectedCountry);
    // Map 객체를 사용하여 중복된 day 값을 제거합니다.
    let uniqueDays = '';
    let dayURL = '';
    if(selectedCountry==="eng"){
        dayURL = "http://localhost:3001/days";
    }else if(selectedCountry==="jap"){
        dayURL = "http://localhost:3002/days";
    }else{
        dayURL = "http://localhost:3003/days";     
    }
    const days = useFetch(dayURL);
    if(days.length===0){
        return <span>Loading...</span>;
    }

    uniqueDays = new Map(days.map(day => [day.day, day]));
    return (
        <>
        <Header kind={selectedCountry}></Header>
         <ul className="list_day">
        {[...uniqueDays.values()].sort((a, b) => a.day - b.day).map(day=>(
            <li key={day.id}>
                <Link to={`day/${day.day}`}>Day {day.day}</Link>
            </li>
        ))}
       
    </ul>

        </>
   
    );
}