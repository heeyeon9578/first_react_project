import useFetch from "./hooks/useFetch"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
export default function CreateWord(){
    const selectedCountry = useParams().eng;
    console.log(selectedCountry);
    let dayURL = '';
    let whatKind ='';
    let uniqueDays = '';
    if(selectedCountry==="eng"){
        dayURL = "http://localhost:3001/words";
        whatKind='영단어';
    }else if(selectedCountry==="jap"){
        dayURL = "http://localhost:3002/words";
        whatKind='일본어 단어';
    }else{
        dayURL = "http://localhost:3003/words";
        whatKind='나만의 단어';
    }

    let dayURL2 = '';
    if(selectedCountry==="eng"){
        dayURL2= "http://localhost:3001/days";
    }else if(selectedCountry==="jap"){
        dayURL2 = "http://localhost:3002/days";
    }else{
        dayURL2 = "http://localhost:3003/days";
    }
    const days = useFetch(dayURL2);
    const navigate = useNavigate();
    const [isLoading, setIsLoading]= useState(false);
    function onSubmit(e){
        e.preventDefault();
        // console.log(engRef.current.value);
        // console.log(korRef.current.value);
        // console.log(dayRef.current.value);
        if(!isLoading){
            setIsLoading(true);
            fetch(dayURL,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    day: dayRef.current.value,
                    eng:engRef.current.value,
                    kor:korRef.current.value,
                    isDone:false,
                    isChecked:(selectedCountry==="star"? true:false),
                }),
        
            }).then(res=>{
                if(res.ok){
                    alert("생성이 완료되었습니다.");
                   navigate(`/${selectedCountry}/day/${dayRef.current.value}`)
                   setIsLoading(false);
                }
            })
        }
        
    }
    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);


    uniqueDays = new Map(days.map(day => [day.day, day]));
    return(
        <form onSubmit={onSubmit}>
            <div className="input_area"> 
                <label>{whatKind}</label>
                <input type="text" placeholder="computer" ref={engRef}></input>
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
                     {[...uniqueDays.values()].sort((a, b) => a.day - b.day).map(day=>(
                         <option key={day.id} value={day.day}>{day.day}</option>
            ))}
                </select>
                
            </div>
            <button style={{
                opacity: isLoading? 0.3: 1,
            }} type="submit"> {isLoading? "Saving...": "저장"}</button>
        </form>
    )
}