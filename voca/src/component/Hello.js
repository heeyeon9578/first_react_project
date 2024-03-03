import World from "./World"
import styles from "./Hello.module.css";
import {useState} from "react";
import UserName from "./UserName";

export default function Hello({age}){
    
   // let name="Mike";
    const [name, setName] = useState("Mike");
    const msg = age >19 ? "성인입니다 ":"미성년자입니다";
    // const [age, setAge] = useState(props.age);
    // function changeName(){
    //    const newName = name === "Mike"? "Jane":"Mike";
    //     console.log(name);
    //     //document.getElementById("name").innerText = name;
    //     setName(newName);
    // }
   
    return (
        <div>
           {/* <h1>state</h1>
          <h2 id="name">{name}</h2>
          <button onClick={()=>{
            setName(name==="Mike" ? "Jane":"Mike");
          }}>Change</button> */}
          <h2 id="name">{name}({age}): {msg}</h2>
          <UserName name2={name}></UserName>
          <button
            onClick={(()=>{
                setName(name==="Mike"? "Jane":"Mike");
                // setAge(age+1);
            })}>
            Change
          </button>
        </div>
    );
}

