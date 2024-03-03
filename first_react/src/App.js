import DayList from "./component/DayList";
import Header from "./component/Header";
import Day from './component/Day';
import CreateWord from "./component/CreateWord";
import {BrowserRouter, Route, Routes} from 'react-router-dom'; 
import EmptyPage from "./component/EmptyPage";
function App() {
  return (
    <BrowserRouter>
     <div className="App">
    <Header></Header>
    <Routes>
      <Route path="/" element={<DayList></DayList>}/>
      <Route path="/day/:day" element={<Day></Day>}/>  
      <Route path="*" element={<EmptyPage></EmptyPage>}/>
      <Route path ="/create_word" element={<CreateWord></CreateWord>}/>
    </Routes>

    </div>
    </BrowserRouter>
   
  );
}

export default App;
