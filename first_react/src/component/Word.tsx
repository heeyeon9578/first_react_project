import { func } from "prop-types";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router";

interface IProps {
    word:Iword;
}
export interface Iword{
    id: number;
    day: string;
    eng: string;
    kor: string;
    isDone: boolean;
    isChecked: boolean;
}
export default function Word({word: w}:IProps){
    const selectedCountry = useParams().eng;
    console.log(selectedCountry);
    const [word, setWord]=useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone,setIsDone]=useState(word.isDone);
    const [isChecked, setIsChecked] = useState(word.isChecked);


    let dayURL = '';

    if(selectedCountry==="eng"){
        dayURL = "1";
    }else if(selectedCountry==="jap"){
        dayURL = "2";
    }else if(selectedCountry==="star"){
        dayURL = "3";
    }

    function toggleShow(){
        setIsShow(!isShow);
    }
    function toggleDone(){
        //setIsDone(!isDone);
        fetch(`http://localhost:300${dayURL}/words/${word.id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                ...word,
                isDone:!isDone
            }),

        })
        .then(res=>{
            if(res.ok){
                setIsDone(!isDone);
            }
        })
    }
    function toggleChecked(isChecked){
        let dayURL2='';
        if(isChecked==false){
            dayURL2='3';
        }else{
            dayURL2= dayURL;
        }
        console.log("dayURL2: ",dayURL2);
        //setIsDone(!isDone);
        fetch(`http://localhost:300${dayURL2}/words/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                ...word,
                isChecked:!isChecked
            }),

        })
        .then(res=>{
            if(res.ok){
                setIsChecked(!isChecked);
                fetch(`http://localhost:300${dayURL}/words/${word.id}`,{
                    method: "DELETE",
                }).then(res=>{
                    if(res.ok){

                        setWord({...word, id:0})
                        fetch(`http://localhost:300${dayURL2}/days`,{
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json',
                            },
                            body: JSON.stringify({
                                day: word.day.toString(),
                            }),
                    
                        }).then(res=>{
                            if(res.ok){
                               
                            }
                        })
                    }
                });
            }
        })
    }
    function del(){
        if(window.confirm('삭제하시겠습니까?')){
            fetch(`http://localhost:300${dayURL}/words/${word.id}`,{
                method: "DELETE",
            }).then(res=>{
                if(res.ok){
                    setWord({...word,id:0})
                }
            });
        }
    }

    if(word.id===0){
        return null;
    }

  
       

    return(
        <tr className={isDone? 'off' :''}>
            <td>
                <input type="checkbox" checked={isDone} onChange={toggleDone}/>
            </td>
            { isChecked ===false &&(
                <td>
                 <input type="checkbox" checked={isChecked} onChange={()=>toggleChecked(isChecked)}/>
                </td>
            )


            }
            
            <td>
                {word.eng}
            </td>
            <td>
                {isShow && word.kor}
            </td>
            <td>
                <button onClick={toggleShow}>뜻 {isShow===false ? "보기":"숨기기"}</button>
                <button onClick={del} className="btn_del">삭제 </button>
            </td>
        </tr>
    )
}