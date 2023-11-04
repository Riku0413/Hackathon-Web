import "./App.css";
import Form from "./Form";
import SignIn from "./auth-components/SignIn";
import SignUp from "./auth-components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MakeBlog from "./Post-components/MakeBlog";
import Trend from "./Item-components/trend";
import Book from "./Item-components/book";
import Movie from "./Item-components/movie";
import Favorite from "./Item-components/favorite";
import MakeBook from "./Post-components/MakeBook";
import MakeMovie from "./Post-components/MakeMovie";
import MakeChapter from "./Post-components/MakeChapter";
import Result from "./Item-components/result";
import HomeAppBar from "./Header-components/HomeAppBar";

import SearchKeywords from "./Header-components/SearchKeywords";
import MyPage from "./Page-components/mypage";
import Draft from "./Page-components/draft";

import { AuthProvider } from "./AuthContext";

import { QueryClient, QueryClientProvider } from "react-query";

import Experiment from "./Experiment";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from "@mui/material";

import Dashboard from "./curriculum-components/Dashboard";

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
              <Route path="/" element={<div><HomeAppBar /><Trend /></div>} />
              <Route path="/blog/" element={<div><HomeAppBar /><Form /></div>} />
              <Route path="/book/" element={<div><HomeAppBar /><Book /></div>} />
              <Route path="/movie/" element={<div><HomeAppBar /><Movie /></div>} />
              <Route path="/favorite/" element={<div><HomeAppBar /><Favorite /></div>} />
              <Route path="/result/" element={<div><HomeAppBar /><Result /></div>} />

              <Route path="/search/" element={<div><HomeAppBar /><SearchKeywords /></div>} />

              <Route path="/signUp/" element={<div><SignUp /></div>} />
              <Route path="/signIn/" element={<div><SignIn /></div>} />

              <Route path="/post/" element={<div><MakeBlog /></div>} />
              <Route path="/makeBook/" element={<div><MakeBook /></div>} />
              <Route path="/makeMovie/" element={<div><MakeMovie /></div>} />
              <Route path="/makeBlog/:blog_id" element={<div><MakeBlog /></div>} />
              <Route path="/makeChapter/" element={<div><MakeChapter /></div>} />

              <Route path="/mypage/" element={<div><HomeAppBar /><MyPage /></div>} />
              <Route path="/setting/" element={<div><HomeAppBar /></div>} />
              <Route path="/team/" element={<div><HomeAppBar /></div>} />
              {/* ここを編集 */}
              <Route path="/draft/*" element={<div><HomeAppBar /><Draft /></div>} />
              {/* <Route path="/draft/:item_category" element={<div><HomeAppBar /><Draft /></div>} /> */}

              <Route path="/notification/" element={<div><HomeAppBar /></div>} />

              <Route path="/curriculum" element={<div><Dashboard /></div>} />

            </Routes>
          </BrowserRouter>
        </AuthProvider>
        </QueryClientProvider>
      </main>

      {/* <footer className="footer-area">
        <div className="footer-items">
          <div className="footer-item-1">
            <div className="footer-title">Forest</div>
            <p>a</p>
          </div>
          <div className="footer-item-2">

          </div>
        </div>
      </footer> */}

      {/* <Container> */}
        <Grid
          container
          spacing={2}
          item 
          xs={12} 
          md={12}
          sx={{bgcolor: "#282c34", minHeight: '400px'}}
          mt={"50px"}
        >
          {/* <div
            style={{
              margin: '20px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              // backgroundColor: 'purple',
            }}
          >
          </div> */}
          <Grid
            item 
            xs={6} 
            md={6}
            sx={{
              height: "200px", 
              // border: '1px solid #ccc',
            }}
          >
            <Grid
              container
              spacing={2}
              item 
              xs={8} 
              md={8}
              sx={{
                height: "70px", 
                // border: '1px solid #ccc',
                margin: "10px",
                ml: "20px"
              }}
            >

              <Grid
                xs={12} 
                md={12}
                sx={{
                  color: "white",
                  fontSize: "40px",
                  fontWeight: "bold",
                  // border: '1px solid #ccc',
                }}
              >
                Forest
              </Grid>
            
              <Grid
                xs={12} 
                md={12}
                sx={{
                  color: "white",
                  fontSize: "15px",
                  paddingTop: "10px"
                  // border: '1px solid #ccc',
                }}
              >
                Nothing is impossible.
              </Grid>

            </Grid>

            <Grid
             container
             spacing={2}
             item 
             xs={8} 
             md={8}
             sx={{
               height: "50px", 
               margin: "10px",
               //  border: '1px solid #ccc',
             }}>

            </Grid>
            <Grid             container
            spacing={2}
            item 
            xs={5} 
            md={5}
            sx={{
              height: "20px", 
              // border: '1px solid #ccc',
              margin: "10px",
              ml: "20px"
            }}>
                            <div style={{color: "white",
              fontSize: "1px",
              // border: '1px solid #ccc',
              width: "300px"
              }}>@ 2023 Forest inc</div>
            </Grid>
          </Grid>
          <Grid
            item 
            xs={3} 
            md={3}
            sx={{
              height: "200px", 
              // border: '1px solid #ccc',
            }}
          >
            <Grid
              item 
              xs={11} 
              md={11}
              sx={{
                height: "40px", 
                // border: '1px solid #ccc',
                mt: "60px"
              }}
            >
              <Link href="https://github.com/Riku0413" target="_blank" rel="noopener noreferrer" sx={{textDecoration: 'none', color: 'white'}}>
                github
              </Link>
            </Grid>
            <Grid
              item 
              xs={11} 
              md={11}
              sx={{
                height: "40px", 
                // border: '1px solid #ccc',
              }}
            >
              <Link href="https://www.example.com" target="_blank" rel="noopener noreferrer" sx={{textDecoration: 'none', color: 'white'}}>
                about me
              </Link>
            </Grid>
            <Grid
              item 
              xs={11} 
              md={11}
              sx={{
                height: "40px", 
                // border: '1px solid #ccc',
              }}
            >
              <Link href="https://www.example.com" target="_blank" rel="noopener noreferrer" sx={{textDecoration: 'none', color: 'white'}}>
                how to use
              </Link>
            </Grid>


          </Grid>
          <Grid
            item 
            xs={3} 
            md={3}
            sx={{
              height: "200px", 
              // border: '1px solid #ccc',
            }}
          >
            <Grid
              item 
              xs={11} 
              md={11}
              sx={{
                height: "40px", 
                // border: '1px solid #ccc',
                mt: "60px"
              }}
            >
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" sx={{textDecoration: 'none', color: 'white'}}>
                X
              </Link>
            </Grid>
            <Grid
              item 
              xs={11} 
              md={11}
              sx={{
                height: "40px", 
                // border: '1px solid #ccc',
              }}
            >
              <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" sx={{textDecoration: 'none', color: 'white'}}>
                Instagram
              </Link>
            </Grid>
            <Grid
              item 
              xs={11} 
              md={11}
              sx={{
                height: "40px", 
                // border: '1px solid #ccc',
              }}
            >
              <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" sx={{textDecoration: 'none', color: 'white'}}>
                Facebook
              </Link>
            </Grid>
          </Grid>
        </Grid>
      {/* </Container> */}

    </div>
  );
}

export default App;