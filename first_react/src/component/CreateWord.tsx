import useFetch from "./hooks/useFetch"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import {IDay} from "./DayList";
import Header from "./Header";
import React from "react";
export default function CreateWord(){
    const selectedCountry = useParams().eng;
    let placeholderWord='';
    console.log(selectedCountry);
    let dayURL = '';
    let whatKind ='';
   
    if(selectedCountry==="eng"){
        dayURL = "http://localhost:3001/words";
        whatKind='영단어';
        placeholderWord = "computer";
    }else if(selectedCountry==="jap"){
        dayURL = "http://localhost:3002/words";
        whatKind='일본어 단어';
        placeholderWord = "コンピュータ";
    }else{
        dayURL = "http://localhost:3003/words";
        whatKind='나만의 단어';
        placeholderWord = "computer/ コンピュータ";
    }

    let dayURL2 = '';
    if(selectedCountry==="eng"){
        dayURL2= "http://localhost:3001/days";
    }else if(selectedCountry==="jap"){
        dayURL2 = "http://localhost:3002/days";
    }else{
        dayURL2 = "http://localhost:3003/days";
    }
    const days:IDay[] = useFetch(dayURL2);
    const navigate = useNavigate();
    const [isLoading, setIsLoading]= useState(false);
    function onSubmit(e: React.FormEvent){
        e.preventDefault();
      
        if(!isLoading&&dayRef.current&& engRef.current&&korRef.current){
            setIsLoading(true);
            const day = dayRef.current.value;
            const eng = engRef.current.value;
            const kor = korRef.current.value;
            fetch(dayURL,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    day,
                    eng,
                    kor,
                    isDone:false,
                    isChecked:(selectedCountry==="star"? true:false),
                }),
        
            }).then(res=>{
                if(res.ok){
                    alert("생성이 완료되었습니다.");
                   navigate(`/${selectedCountry}/day/${day}`)
                   setIsLoading(false);
                }
            })
        }
        
    }
    const engRef = useRef<HTMLInputElement>(null);
    const korRef = useRef<HTMLInputElement>(null);
    const dayRef = useRef<HTMLSelectElement>(null);

    // Map 객체를 사용하여 중복된 day 값을 제거합니다.
    let uniqueDays = new Map<string, IDay>();
    uniqueDays = new Map(days.map(day => [day.day, day]));
    return(
        <>
        <Header kind={selectedCountry} where={""}></Header>
        <form onSubmit={onSubmit}>
            <div className="input_area"> 
                <label>{whatKind}</label>
                <input type="text" placeholder={placeholderWord} ref={engRef}></input>
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type="text" placeholder="컴퓨터" ref={korRef}></input>
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>
                    {/* {days.map(day=>(
                        <option key={day.id} value={day.day}>{day.day}</option>
                    ))} */}
                    
                     {[...uniqueDays.values()]
                        .sort((a, b) => parseInt(a.day, 10) - parseInt(b.day, 10))
                        .map(day => (
                            <option key={day.id} value={day.day}>{day.day}</option>
                    ))
                    }
                </select>
                
            </div>
            <button style={{
                opacity: isLoading? 0.3: 1,
            }} type="submit"> {isLoading? "Saving...": "저장"}</button>
        </form>
        </>
        
    )
}