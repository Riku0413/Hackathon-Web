import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Link } from "@mui/material";
import { useState, useEffect } from "react";


function Footer() {
  // const [renderComplete, setRenderComplete] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setRenderComplete(true);
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (!renderComplete) {
  //   return null;
  // }

  return (
    <div>
      <div style={{ marginTop: '50px' }}></div>

      {/* <Container> */}
        <Grid
          container
          spacing={2}
          item 
          xs={12} 
          md={12}
          sx={{bgcolor: "#282c34", minHeight: '600px', bottom: 0}}
          // mt={"50px"}
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
                Start
              </Grid>
            
              <Grid
                xs={12} 
                md={12}
                sx={{
                  color: "white",
                  fontSize: "12px",
                  paddingTop: "10px"
                  // border: '1px solid #ccc',
                }}
              >
                One big step from here.
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
              }}>@ 2023 Start inc</div>
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

export default Footer;