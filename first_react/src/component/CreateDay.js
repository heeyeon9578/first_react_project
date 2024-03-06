import useFetch from "./hooks/useFetch";
import { useParams } from "react-router";
import { Navigator, useNavigate } from "react-router";
export default function CreateDay(){
    const selectedCountry = useParams().eng;
    console.log(selectedCountry);
    let dayURL = '';
    if(selectedCountry==="eng"){
        dayURL = "http://localhost:3001/days";
    }else if(selectedCountry==="jap"){
        dayURL = "http://localhost:3002/days";
    }
    const days = useFetch(dayURL);
    const navigate = useNavigate();
    function addDay(){
        fetch(dayURL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                day: days.length+1,
            }),
    
        }).then(res=>{
            if(res.ok){
                alert("생성이 완료되었습니다.");
               navigate(`/${selectedCountry}`)
            }
        })
    }
    return(
        <div>
            <h3>현재 일수: {days.length}</h3>
            <button onClick={addDay}>Day 추가</button>
        </div>
    );
}