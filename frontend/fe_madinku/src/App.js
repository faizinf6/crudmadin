
import BerandaPages from "./components/beranda";
import AbsensiList from "./components/absensiList";
import RekapNilai from "./components/rekapNilai";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<BerandaPages/>}/>
      <Route path="/absensi" element={<AbsensiList/>}/>
      <Route path="/rekap" element={<RekapNilai/>}/>
    </Routes>
  </BrowserRouter>

    </div>
  );
}

export default App;
