
import BerandaPages from "./components/beranda";
import AbsensiList from "./components/absensiList";
import RekapNilai from "./components/rekapNilai";
import TabelRapot from "./components/TabelRapot";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthPage from "./components/authPage";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthPage/>}/>
      <Route path="/beranda" element={<BerandaPages/>}/>
      <Route path="/data-murid" element={<AbsensiList/>}/>
      <Route path="/rekap-nilai" element={<RekapNilai/>}/>
      <Route path="/rekap/rapot" element={<TabelRapot/>}/>
    </Routes>
  </BrowserRouter>

    </div>
  );
}

export default App;
