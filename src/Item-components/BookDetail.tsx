import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

import { httpFetcher } from '../http-components/http_fetcher';


interface ChapterData {
  id: string;
  title: string;
  update_time: string;
}


export default function BookDetail() {
  const [title, setTitle] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [chapters, setChapters] = useState<ChapterData[]>();
  const [book_id, setBookId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    setBookId(lastSegment)

    // GETリクエストはパスで取得したいデータを指定
    console.log("111")
    httpFetcher(`http://localhost:8080/book/${lastSegment}`)
    .then(result => {
      setTitle(result.title);
      setIntroduction(result.introduction);
    });
    // book_idをもとにchapterを取得
    httpFetcher(`http://localhost:8080/chapters/${lastSegment}`)
    .then(result => {
      setChapters(result);
      console.log(result);
    });
  
  }, []);

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
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  // backgroundColor: 'purple',
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
                {/* 説明 */}
                {introduction}
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={0}
            // sx={{backgroundColor: 'lightgreen'}}
          >
            チャプターの一覧
            <Grid
              item
              xs={12}
              md={12}
              // sx={{backgroundColor: 'blue'}}
            >

              <div>
                {chapters && chapters.length > 0 ? (
                  <div>
                    {chapters.map((chapter, index) => (
                      <div key={index}>
                        <div
                          style={{
                            margin: '20px',
                            padding: '20px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            minHeight: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'pink'
                          }}
                        >
                          <Link to={`/chapter/detail/${chapter.id}`}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flexGrow: 1 }}>
                              {chapter.title ? chapter.title : "no title"}
                            </div>
                            <div>
                            </div>
                          </div>
                          {chapter.update_time.split(" ")[0]}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No chapters available</p>
                )}
              </div>

            </Grid>

          </Grid>

        </Box>
      </Container>

      <div style={{height: "50px"}}></div>

    </Box>
  );
}
