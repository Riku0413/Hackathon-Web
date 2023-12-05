import { useState, ChangeEvent, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import * as marked from 'marked';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { useAuth } from '../AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { httpFetcher } from '../http-components/http_fetcher';
import { httpChapterUpdate } from '../http-components/http_chapter_update';


export default function ChapterDetail() {
  const [title, setTitle] = useState<string>('');
  const [markdownInput, setMarkdownInput] = useState<string>('');
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  const [book_id, setBookId] = useState('');
  const [chapter_id, setChapterId] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    setChapterId(lastSegment)

    // GETリクエストはパスで取得したいデータを指定
    httpFetcher(`http://localhost:8080/chapter/${lastSegment}`)
    .then(result => {
      setTitle(result.title);
      setMarkdownInput(result.content);
      const htmlText = marked.parse(result.content);
      setHtmlOutput(htmlText);
      setBookId(result.book_id);
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
            // sx={{backgroundColor: 'lightgreen'}}
          >

            <Grid
              item
              xs={12}
              md={12}
              // sx={{backgroundColor: 'brown'}}
            >
              <div
                style={{
                  margin: '20px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '3px',
                  paddingBottom: '0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '237px',
                  display: 'flex',
                  flexDirection: 'column',
                  // backgroundColor: 'purple'
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: htmlOutput }} style={{ flex: 1 }} />
              </div>

            </Grid>

          </Grid>

        </Box>

      </Container>

    </Box>
  );
}
