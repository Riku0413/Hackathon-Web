import { useState, ChangeEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import * as marked from 'marked';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { Link } from 'react-router-dom';
import { Switch } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../AuthContext';

import { httpBookPublish } from '../http-components/http_book_publish';
import { httpFetcher } from '../http-components/http_fetcher';
import { httpBookUpdate } from '../http-components/http_book_update';
import { httpChapterMake } from '../http-components/http_chapter_make';

import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



interface ChapterData {
  id: string;
  title: string;
  update_time: string;
}


export default function MakeBook() {
  const [title, setTitle] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [chapters, setChapters] = useState<ChapterData[]>();

  const {user, loading} = useAuth();
  const [book_id, setBookId] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // チャプター追加ボタン
  const handleButtonClick = async () => {
    await httpChapterMake(book_id);
    await httpFetcher(`http://localhost:8080/chapters/${book_id}`)
    .then(result => {
      setChapters(result);
      console.log(result);
    });
  };

  const toggleSwitch = () => {
    console.log(!isDraft);
    setIsDraft(!isDraft);
  };

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
  
  }, [user, loading]);

  // 公開 or 下書き保存
  const handlePutRequest = () => {
    // POSTリクエストはデータIDで宛先を指定
    console.log(isDraft);
    httpBookPublish(book_id, isDraft)
    navigate("/draft/book")
  };

  const handleTitleInputChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    await setTitle(input); // タイトルの更新が完了するまで待つ
    await httpBookUpdate(book_id, input, introduction); // タイトルの更新後に更新処理を実行
  };  
  
  const handleIntroductionInputChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    await setIntroduction(input); // タイトルの更新が完了するまで待つ
    await httpBookUpdate(book_id, title, input); // タイトルの更新後に更新処理を実行
  };  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed"  sx={{backgroundColor: "white"}}>
        <Toolbar>

          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                // display: { xs: 'none', sm: 'block' },
                backgroundColor: 'orange',
                color: 'white',
                px: 2, // 左右のパディングを追加
                borderRadius: 1
              }}
            >
                <Typography variant="h6" noWrap component="div">
                  Forest
                </Typography>
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <div style={{ color: 'gray', marginLeft: "10px", fontSize: "15px" }}>公開設定</div>
          <Switch onChange={toggleSwitch} checked={isDraft} />
          <Button color="primary" variant='outlined' style={{ width: '104px', height: '35px' }} onClick={handlePutRequest}>
            {isDraft ? '公開する' : '下書き保存'}
          </Button>

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
              タイトル
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
                  placeholder="本のタイトル"
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
              本の説明
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
                <TextareaAutosize
                  placeholder="説明を入力しよう"
                  style={{
                    border: 'none',
                    width: '100%',
                    resize: 'none',
                    outline: 'none',
                    flex: 1,
                    fontSize: '18px',
                    // backgroundColor: 'purple'
                  }}
                  value={introduction}
                  onChange={handleIntroductionInputChange}
                />
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
              {/* <Link to="/makeChapter" style={{textDecoration: 'none'}}>
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
                  チャプター１
                </div>
              </Link> */}

              {/* ここからが本題 */}
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
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flexGrow: 1 }}>
                              {chapter.title ? chapter.title : "no title"}
                            </div>
                            <div>                
                              <Link to={`/makeChapter/${chapter.id}`}>
                                <Fab color="default" aria-label="edit" size="small">
                                  <EditIcon />
                                </Fab>
                              </Link>
                            </div>
                          </div>
                          {chapter.update_time.split(" ")[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No chapters available</p>
                )}
              </div>


            </Grid>

            <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="primary" onClick={handleButtonClick}>
                チャプターを追加
              </Button>
            </Grid>

          </Grid>

        </Box>
      </Container>

    </Box>
  );
}
