import "./App.css";
// import Header from "./Header-components/Header";
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
import Result from "./Item-components/result";
import HomeAppBar from "./Header-components/HomeAppBar";

import SearchKeywords from "./Header-components/SearchKeywords";
import MyPage from "./Page-components/mypage";

function App() {

  return (
    <div className="App">

      <main>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Header />} /> */}
            {/* <Route path="/" element={<div><Header /><Trend /></div>} />
            <Route path="/blog/" element={<div><Header /><Form /></div>} />
            <Route path="/books/" element={<div><Header /><Books /></div>} />
            <Route path="/movie/" element={<div><Header /><Movie /></div>} />
            <Route path="/favorite/" element={<div><Header /><Favorite /></div>} />
            <Route path="/result/" element={<div><Header /><Result /></div>} /> */}

            <Route path="/" element={<div><HomeAppBar /><Trend /></div>} />
            <Route path="/blog/" element={<div><HomeAppBar /><Form /></div>} />
            <Route path="/books/" element={<div><HomeAppBar /><Books /></div>} />
            <Route path="/movie/" element={<div><HomeAppBar /><Movie /></div>} />
            <Route path="/favorite/" element={<div><HomeAppBar /><Favorite /></div>} />
            <Route path="/result/" element={<div><HomeAppBar /><Result /></div>} />

            <Route path="/search/" element={<div><HomeAppBar /><SearchKeywords /></div>} />

            <Route path="/signUp/" element={<div><SignUp /></div>} />
            <Route path="/signIn/" element={<div><SignIn /></div>} />

            <Route path="/post/" element={<div><MakeArticle /></div>} />
            <Route path="/makeBook/" element={<div><MakeBook /></div>} />
            <Route path="/makeMovie/" element={<div><MakeMovie /></div>} />
            <Route path="/makeArticle/" element={<div><MakeArticle /></div>} />
            <Route path="/makeChapter/" element={<div><MakeChapter /></div>} />

            <Route path="/mypage/" element={<div><HomeAppBar /><MyPage /></div>} />
            <Route path="/setting/" element={<div><HomeAppBar /></div>} />
            <Route path="/team/" element={<div><HomeAppBar /></div>} />
            <Route path="/draft/" element={<div><HomeAppBar /></div>} />
            <Route path="/notification/" element={<div><HomeAppBar /></div>} />

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