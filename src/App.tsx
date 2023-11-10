import "./App.css";
import Form from "./Form";
import SignIn from "./auth-components/SignIn";
import SignUp from "./auth-components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MakeBlog from "./Post-components/MakeBlog";
import Trend from "./Item-components/trend";
import Book from "./Item-components/book";
import Video from "./Item-components/video";
import Favorite from "./Item-components/favorite";
import MakeBook from "./Post-components/MakeBook";
import MakeVideo from "./Post-components/MakeVideo";
import MakeChapter from "./Post-components/MakeChapter";
import Result from "./Item-components/result";
import HomeAppBar from "./Header-components/HomeAppBar";
import SearchKeywords from "./Header-components/SearchKeywords";
import MyPage from "./Page-components/mypage";
import Draft from "./Page-components/draft";
import { AuthProvider } from "./AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Experiment from "./Experiment";

import Dashboard from "./curriculum-components/Dashboard";
import Footer from "./Header-components/Footer";

import BlogDetail from "./Item-components/BlogDetail";
import BookDetail from "./Item-components/BookDetail";
import VideoDetail from "./Item-components/VideoDetail";
import ChapterDetail from "./Item-components/ChapterDetail";


const queryClient = new QueryClient();


function App() {

  return (
    <div className="App">

      <main>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/experiment" element={<Experiment />} />
              
              <Route path="/" element={<div><HomeAppBar /><Trend /><Footer /></div>} />
              <Route path="/favorite/" element={<div><HomeAppBar /><Favorite /><Footer /></div>} />
              <Route path="/blog/" element={<div><HomeAppBar /><Form /><Footer /></div>} />
              <Route path="/book/" element={<div><HomeAppBar /><Book /><Footer /></div>} />
              <Route path="/video/" element={<div><HomeAppBar /><Video /><Footer /></div>} />

              <Route path="/search/" element={<div><HomeAppBar /><SearchKeywords /><Result /><Footer /></div>} />

              <Route path="/signUp/" element={<div><SignUp /></div>} />
              <Route path="/signIn/" element={<div><SignIn /></div>} />

              <Route path="/post/" element={<div><MakeBlog /><Footer /></div>} />
              {/* <Route path="/makeBook/" element={<div><MakeBook /><Footer /></div>} /> */}
              <Route path="/makeVideo/:video_id" element={<div><MakeVideo /><Footer /></div>} />
              <Route path="/makeBlog/:blog_id" element={<div><MakeBlog /><Footer /></div>} />
              <Route path="/makeBook/:book_id" element={<div><MakeBook /><Footer /></div>} />
              <Route path="/makeChapter/:chapter_id" element={<div><MakeChapter /><Footer /></div>} />

              <Route path="/mypage/" element={<div><HomeAppBar /><MyPage /><Footer /></div>} />
              <Route path="/setting/" element={<div><HomeAppBar /><Footer /></div>} />
              <Route path="/team/" element={<div><HomeAppBar /><Footer /></div>} />
              {/* ここを編集 */}
              <Route path="/draft/*" element={<div><HomeAppBar /><Draft /><Footer /></div>} />
              {/* <Route path="/draft/:item_category" element={<div><HomeAppBar /><Draft /></div>} /> */}

              <Route path="/notification/" element={<div><HomeAppBar /><Footer /></div>} />

              <Route path="/curriculum" element={<div><Dashboard /></div>} />

              <Route path="/blog/detail/:blog_id" element={<div><HomeAppBar /><BlogDetail /><Footer /></div>} />
              <Route path="/book/detail/:book_id" element={<div><HomeAppBar /><BookDetail /><Footer /></div>} />
              <Route path="/video/detail/:video_id" element={<div><HomeAppBar /><VideoDetail /><Footer /></div>} />
              <Route path="/chapter/detail/:chapter_id" element={<div><HomeAppBar /><ChapterDetail /><Footer /></div>} />

            </Routes>
          </BrowserRouter>
        </AuthProvider>
        </QueryClientProvider>
      </main> 

    </div>
  );
}

export default App;