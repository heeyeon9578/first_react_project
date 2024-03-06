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

    let dayURL = '';
    if(selectedCountry==="eng"){
        dayURL = "http://localhost:3001/days";
    }else if(selectedCountry==="jap"){
        dayURL = "http://localhost:3002/days";
    }
    const days = useFetch(dayURL);
    if(days.length===0){
        return <span>Loading...</span>;
    }
    // useEffect(()=>{
    //    fetch('http://localhost:3001/days')
    //    .then(res=>{
    //     return res.json()
    //    })
    //    .then(data=>{
    //     setDays(data);
    //    })

    // },[]);
    return (
        <>
        <Header kind={selectedCountry=== 'eng'? 'eng':'jap'}></Header>
         <ul className="list_day">
        {days.map(day=>(
            <li key={day.id}>
                <Link to={`day/${day.day}`}>Day {day.day}</Link>
            </li>
        ))}
       
    </ul>

        </>
   
    );
}