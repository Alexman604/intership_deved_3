import Header from "../header/header";

import LoginPage from "../loginPage/loginPage";
import MainPage from "../mainPage/mainPage";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
         <Route index element={<MainPage />} />
            <Route path="/login" exact element={ <LoginPage /> } />
       
      </Route>
    </Routes>

    
  );
}

export default App;
