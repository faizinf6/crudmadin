
import BerandaPages from "./components/beranda";
import AbsensiList from "./components/absensiList";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<BerandaPages/>}/>
      <Route path="/absensi" element={<AbsensiList/>}/>
    </Routes>
  </BrowserRouter>

    </div>
  );
}

export default App;
