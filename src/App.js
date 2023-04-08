import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import Menu from "./components/Menu";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content-wrapper">
        <div className="menu">
          <Menu />
        </div>
        <div className="content">
          <Routes>
            <Route index element={<MainPage />} />
            {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/forgot' element={<ForgotPassPage/>}/> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
