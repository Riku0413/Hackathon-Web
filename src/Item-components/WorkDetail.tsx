import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { httpFetcher } from '../http-components/http_fetcher';
// import YouTubeVideo from './youtube';
import Button from '@mui/material/Button';


export default function WorkDetail() {
  const [title, setTitle] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [url, setURL] = useState<string>("");

  const [work_id, setWorkId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    setWorkId(lastSegment)

    // GETリクエストはパスで取得したいデータを指定
    httpFetcher(`https://hackathon-bafb6ceksa-uc.a.run.app/work/${lastSegment}`)
    .then(result => {
      console.log(result)
      setTitle(result.title);
      setIntroduction(result.introduction);
      // ここどうする？？？
      setURL(result.url);
    });
  
  }, []);

  const handleButtonClick = () => {
    window.open(url, '_blank');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      <Container
        // sx={{backgroundColor: 'green'}}
      >
        <Box
          sx={{
            flexGrow: 1,
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: 'red'
          }}
        >

          <Grid
            container
            spacing={0}
            sx={{
              // backgroundColor: 'yellow',
              marginTop: '20px',
              flex: 1
            }}
          >
            <Grid
              item
              xs={12}
              md={12}
              // sx={{ backgroundColor: 'orange' }}
            >
              <div
                style={{
                  margin: '20px',
                  marginBottom: 0, // だいたい
                  padding: '5px',
                  // border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  // backgroundColor: 'purple',
                  fontSize: '40px'
                }}
              >
                {/* タイトル */}
                {title}
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={0}
            sx={{
              // backgroundColor: 'yellow',
              marginTop: '20px',
              flex: 1
            }}
          >
            <Grid
              item
              xs={12}
              md={12}
              // sx={{ backgroundColor: 'orange' }}
            >
              <div
                style={{
                  margin: '20px',
                  marginBottom: 0, // だいたい
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  // backgroundColor: 'purple',
                }}
              >
                {/* 動画の説明 */}
                {introduction}
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={0}
            sx={{
              // backgroundColor: 'yellow',
              marginTop: '20px',
              flex: 1
            }}
          >
            <Grid
              item
              xs={12}
              md={12}
              // sx={{ backgroundColor: 'orange' }}
            >

            　<Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
              >
                Go to the Work
              </Button>

            </Grid>
          </Grid>

        </Box>
      </Container>

    </Box>
  );
}
