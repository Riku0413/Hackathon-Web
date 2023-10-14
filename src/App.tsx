import "./App.css";
import Header from "./Header-components/Header";
import Form from "./Form";
import SignIn from "./auth-components/SignIn";
import SignUp from "./auth-components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MakeArticle from "./Post-components/MakeArticle";
import Trend from "./Item-components/trend";
import Books from "./Item-components/books";
import Movie from "./Item-components/movie";
import Favorite from "./Item-components/favorite";
import MakeBook from "./Post-components/MakeBook";
import MakeMovie from "./Post-components/MakeMovie";
import MakeChapter from "./Post-components/MakeChapter";

function App() {

  return (
    <div className="App">

      <main>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Header />} /> */}
            <Route path="/" element={<div><Header /><Trend /></div>} />
            <Route path="/blog/" element={<div><Header /><Form /></div>} />
            <Route path="/books/" element={<div><Header /><Books /></div>} />
            <Route path="/movie/" element={<div><Header /><Movie /></div>} />
            <Route path="/signUp/" element={<div><SignUp /></div>} />
            <Route path="/signIn/" element={<div><SignIn /></div>} />
            <Route path="/favorite/" element={<div><Header /><Favorite /></div>} />
            <Route path="/post/" element={<div><MakeArticle /></div>} />
            <Route path="/makeBook/" element={<div><MakeBook /></div>} />
            <Route path="/makeMovie/" element={<div><MakeMovie /></div>} />
            <Route path="/makeArticle/" element={<div><MakeArticle /></div>} />
            <Route path="/makeChapter/" element={<div><MakeChapter /></div>} />
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