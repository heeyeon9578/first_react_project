import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "./hooks/useFetch";
// import dummy from "../DB/data.json";

export default function DayList(){
    //console.log(dummy);
    //const [days, setDays] = useState([]);
    //const [count, setCount]= useState(0);
    const days = useFetch("http://localhost:3001/days");
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