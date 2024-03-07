import { Link } from "react-router-dom";
export default function Welcome(){
    return (
        <div className="welcome">
            <h1>
                <Link to="/eng">토익 영어 단어집</Link>
            </h1>
             <h1>
                <Link to="/jap">토익 일본어 단어집</Link>
            </h1>
            <h1>
                <Link to="/star">나만의 단어집</Link>
            </h1>
        </div>
        

    )
}