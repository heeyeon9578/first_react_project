//import dummy from "../DB/data.json";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Word from "./Word";
import useFetch from "./hooks/useFetch";
export default function Day(){
    const a = useParams();
    console.log(a);
    const day=a.day;
    const words = useFetch(`http://localhost:3001/words?day=${day}`);
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
        <h2>Day : {day}</h2>
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