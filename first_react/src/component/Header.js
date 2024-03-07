import { Link } from "react-router-dom";

export default function Header({kind}){
    let kindVal =  '';
    if(kind==="eng"){
        kindVal ="영단어";
    }else if(kind==="jap"){
        kindVal = "일본어 단어";
    }else if(kind==="star"){
        kindVal = "나만의 단어";
    }else{
        kindVal = "";
    }

    return(
        <div className="header">
            <h1>
                <Link to={`/${kind}`}>토익 {kindVal}</Link>
             </h1>

             <div className="menu">
                <Link to={`/${kind}/create_word`} className="link">
                        단어 추가
                </Link>
                <Link to={`/${kind}/create_day`} className="link">
                    Day 추가
                </Link>
                <Link to={`/`} className="link">
                    홈으로
                </Link>
             </div>
        </div>
    )
}