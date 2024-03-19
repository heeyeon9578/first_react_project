import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import Header from "./Header";
import { Iword } from "./Word";
import React from "react";
// import dummy from "../DB/data.json";

export interface IDay{
    id:number;
    day:string;
}
export default function DayList(){
    //console.log(dummy);
    //const [days, setDays] = useState([]);
    //const [count, setCount]= useState(0);
    const selectedCountry = useParams().eng;
    console.log(selectedCountry);
    // Map 객체를 사용하여 중복된 day 값을 제거합니다.
    let uniqueDays = new Map<string, IDay>();

    let dayURL = '';
    if(selectedCountry==="eng"){
        dayURL = "1";

    }else if(selectedCountry==="jap"){
        dayURL = "2";
    
    }else if(selectedCountry==="star"){
        dayURL = "3";

    }
    // 모든 days와 해당하는 모든 words를 불러옵니다.
    const days: IDay[] = useFetch(`http://localhost:300${dayURL}/days`);
    const allWords: Iword[] = useFetch(`http://localhost:300${dayURL}/words`);

    if(days.length===0){
        return <span>Loading...</span>;
    }
    
    uniqueDays = new Map(days.map(day => [day.day, day]));

     // 각 day별 단어 개수를 계산하는 함수
    const countWordsByDay = (dayId: string) => {
        return allWords.filter(word => word.day === dayId).length;
    };
    return (
        <>
        <Header kind={selectedCountry} where={""}></Header>
         <ul className="list_day">
         {
  [...uniqueDays.values()]
    .sort((a, b) => parseInt(a.day, 10) - parseInt(b.day, 10))
    .map(day => (
      <li className="li-dayList" key={day.id}>
        <div className="words-count-badge">{countWordsByDay(day.day.toString())}</div>
        <Link to={`day/${day.day}`}>Day {day.day}</Link>
      </li>
    ))
}

       
    </ul>

        </>
   
    );
}