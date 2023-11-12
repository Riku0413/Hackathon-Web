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


export default function MakeChapter() {
  const [title, setTitle] = useState<string>('');
  const [markdownInput, setMarkdownInput] = useState<string>('');
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  const [isDraft, setIsDraft] = useState(false);
  const [book_id, setBookId] = useState('');
  const [chapter_id, setChapterId] = useState('');
  const {user, loading} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleTextInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    setMarkdownInput(inputText);

    // マークダウンをHTMLに変換してプレビューに表示
    const htmlText = marked.parse(inputText);
    setHtmlOutput(htmlText);
    
    // POSTリクエストはデータIDで宛先を指定
    httpChapterUpdate(chapter_id, title, inputText)
  };

  const handleTitleInputChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    await setTitle(input); // タイトルの更新が完了するまで待つ
    await httpChapterUpdate(chapter_id, input, markdownInput); // タイトルの更新後に更新処理を実行
  };  

  // ボタンがクリックされたときの処理を定義
  const handleCodeButtonClick = () => {
    // ここにコードボタンがクリックされたときの処理を追加
    console.log('Code button clicked');
  };
  const handleImageButtonClick = () => {
    // ここにイメージボタンがクリックされたときの処理を追加
    console.log('Image button clicked');
  };
  const handleTableButtonClick = () => {
    // ここにテーブルボタンがクリックされたときの処理を追加
    console.log('Table button clicked');
  };


  useEffect(() => {
    
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    setChapterId(lastSegment)

    // GETリクエストはパスで取得したいデータを指定
    httpFetcher(`https://hackathon-bafb6ceksa-uc.a.run.app/chapter/${lastSegment}`)
    .then(result => {
      setTitle(result.title);
      setMarkdownInput(result.content);
      const htmlText = marked.parse(result.content);
      setHtmlOutput(htmlText);
      setBookId(result.book_id);
    });
  
  }, [user, loading]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed"  sx={{backgroundColor: "white"}}>
        <Toolbar>

          <Link to={`/makeBook/${book_id}`} style={{ textDecoration: 'none' }}>
            <ArrowBackIcon></ArrowBackIcon>
          </Link>

          {/* <Box sx={{ flexGrow: 1 }} /> */}

        </Toolbar>
      </AppBar>

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
                <TextareaAutosize
                  placeholder="ページのタイトル"
                  style={{
                    border: 'none',
                    width: '100%',
                    resize: 'none',
                    outline: 'none',
                    flex: 1,
                    fontSize: '24px',
                    // backgroundColor: 'purple'
                  }}
                  value={title}
                  onChange={handleTitleInputChange}
                />
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={0}
            sx={{
              // backgroundColor: 'yellow',
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
                  marginBottom: 0, // むりやり
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '20px',
                  display: 'flex',
                  // flexDirection: 'column',
                  // backgroundColor: 'purple',
                }}
              >

                <IconButton color='primary' onClick={handleCodeButtonClick}>
                  <CodeIcon />
                </IconButton>
                <IconButton color='primary' onClick={handleImageButtonClick}>
                  <ImageIcon />
                </IconButton>
                <IconButton color='primary' onClick={handleTableButtonClick}>
                  <TableChartIcon />
                </IconButton>

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
              xs={6}
              md={6}
              // sx={{backgroundColor: 'blue'}}
            >
              <div
                style={{
                  margin: '20px',
                  padding: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  // backgroundColor: 'pink'
                }}
              >
                <TextareaAutosize
                  placeholder="ここにMarkdown記法で書いてみよう"
                  style={{
                    border: 'none',
                    width: '100%',
                    resize: 'none',
                    outline: 'none',
                    flex: 1,
                    // backgroundColor: 'purple'
                  }}
                  value={markdownInput}
                  onChange={handleTextInputChange}
                />
              </div>
            </Grid>

            <Grid
              item
              xs={6}
              md={6}
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
