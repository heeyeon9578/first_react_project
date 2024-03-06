//import dummy from "../DB/data.json";
import { useParams } from "react-router";
import Header from "./Header";
import { useEffect, useState } from "react";
import Word from "./Word";
import useFetch from "./hooks/useFetch";
export default function Day(){
    const selectedCountry = useParams().eng;
    console.log(selectedCountry);
    const selectedDay = useParams();
    console.log(selectedDay);
    const day=selectedDay.day;
    let dayURL = '';

    if(selectedCountry==="eng"){
        dayURL = "1";
    }else if(selectedCountry==="jap"){
        dayURL = "2";
    }
    const words = useFetch(`http://localhost:300${dayURL}/words?day=${day}`);
    //const[words, setWords]=  useState([]);
    //const wordList = dummy.words.filter(word=>(
        //word.day === Number(day)
   // ));
    // useEffect(()=>{
    //     fetch(`http://localhost:3001/words?day=${day}`)
    //     .then(res=>{
    //      return res.json()
    //     })
    //     .then(data=>{
    //      setWords(data);
    //     })
 
    //  },[]);
    //console.log(wordList);
    return(
        <>
        <Header kind={selectedCountry=== 'eng'? 'eng':'jap'}></Header>
        <h2>Day : {day}</h2>
        {words.length ===0 && <span>Loading...</span>}
        <table>
        <tbody>
            {words.map(word=>(
                 <Word word={word} key={word.id}></Word>
            )
               
            )}
        </tbody>
        </table>
        
            
            </>
    );
}