import './App.css';
import Dashboard from './components/Dashboard';
import 'antd/dist/antd.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './components/Root';

function App() {
  return (
    <>
    {/* <div className="App">
      <Dashboard/>
    </div> */}
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/root" element={<Root title= 'Dropbox'/>} />
        {/* <Route path="login" element={localStorage.getItem('authToken') ? <HomePage /> : <SocialAuth/> } />
        <Route exact path="/linkedin" element= {<LinkedInPopUp/>} /> */}
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
