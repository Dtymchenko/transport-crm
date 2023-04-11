import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="content-wrapper">
        <div className="content">
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/forgotpass" element={<ForgotPassPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
