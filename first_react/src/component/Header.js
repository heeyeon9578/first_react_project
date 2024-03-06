import { Link } from "react-router-dom";

export default function Header({kind}){
    return(
        <div className="header">
            <h1>
                <Link to={kind==="eng"? "/eng":"/ah"}>토익 {kind==="eng"?"영단어":"일본어 단어"}</Link>
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