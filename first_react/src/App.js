import DayList from "./component/DayList";
import CreateDay from "./component/CreateDay";
import DeleteDay from "./component/DeleteDay";
import Day from './component/Day';
import CreateWord from "./component/CreateWord";
import {BrowserRouter, Route, Routes} from 'react-router-dom'; 
import EmptyPage from "./component/EmptyPage";
import Welcome from "./component/Welcome";
function App() {
  return (
    <BrowserRouter>
     <div className="App">
    
    <Routes>
      <Route path="/:eng" element={<DayList></DayList>}/>
      <Route path="/" element={<Welcome></Welcome>}/>
      <Route path="/:eng/day/:day" element={<Day></Day>}/>  
      <Route path="*" element={<EmptyPage></EmptyPage>}/>
      <Route path ="/:eng/create_word" element={<CreateWord></CreateWord>}/>
      <Route path ="/:eng/create_day" element={<CreateDay></CreateDay>}/>
      <Route path ="/:eng/delete_day" element={<DeleteDay></DeleteDay>}/>


    </Routes>

    </div>
    </BrowserRouter>
   
  );
}

export default App;
