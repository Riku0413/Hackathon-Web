import "./App.css";
import Header from "./Header";
import Form from "./Form";
import SignIn from "./SignIn";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">

      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/blog/" element={<div><Header /><Form /></div>} />
            <Route path="/books/" element={<div><Header /></div>} />
            <Route path="/movie/" element={<div><Header /></div>} />
            <Route path="/signIn/" element={<div><SignIn /></div>} />
            <Route path="/login/" element={<div><Login /></div>} />
            <Route path="/favorite/" element={<div><Header /></div>} />
            <Route path="/trend/" element={<div><Header /></div>} />
          </Routes>
        </BrowserRouter>
      </main>

      <footer className="footer-area">
        <div className="footer-items">
          <div className="footer-item-1">
            <div className="footer-title">Forest</div>
          </div>
          <div className="footer-item-2">

          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;