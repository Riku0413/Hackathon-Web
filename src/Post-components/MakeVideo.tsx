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
import { httpVideoMake } from '../http-components/http_video_make';
import { httpVideoUpdate } from '../http-components/http_video_update';
import { httpVideoPublish } from '../http-components/http_video_publish';

import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import YouTubeVideo from '../Item-components/youtube';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



interface ChapterData {
  id: string;
  title: string;
  update_time: string;
}


export default function MakeVideo() {
  const [title, setTitle] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [url, setURL] = useState<string>("");

  const {user, loading} = useAuth();
  const [video_id, setVideoId] = useState('');
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

  const toggleSwitch = () => {
    console.log(!isDraft);
    setIsDraft(!isDraft);
  };

  useEffect(() => {
    
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    setVideoId(lastSegment)

    // GETリクエストはパスで取得したいデータを指定
    httpFetcher(`http://localhost:8080/video/${lastSegment}`)
    .then(result => {
      console.log(result)
      setTitle(result.title);
      setIntroduction(result.introduction);
      setURL(result.url.Scheme+"://"+result.url.Host+result.url.Path+"?"+result.url.RawQuery);
    });
  
  }, [user, loading]);

  // 公開 or 下書き保存
  const handlePutRequest = () => {
    // POSTリクエストはデータIDで宛先を指定
    console.log(isDraft);
    httpVideoPublish(video_id, isDraft)
    navigate("/draft/video")
  };

  const handleTitleInputChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    await setTitle(input); // タイトルの更新が完了するまで待つ
    await httpVideoUpdate(video_id, input, introduction, url); // タイトルの更新後に更新処理を実行
  };  
  
  const handleIntroductionInputChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    await setIntroduction(input); // タイトルの更新が完了するまで待つ
    await httpVideoUpdate(video_id, title, input, url); // タイトルの更新後に更新処理を実行
  };  

  const handleUrlInputChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    await setURL(input); // タイトルの更新が完了するまで待つ
    await httpVideoUpdate(video_id, title, introduction, input); // タイトルの更新後に更新処理を実行
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
                  placeholder="動画のタイトル"
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
              動画の説明
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
              動画のURL
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
                  placeholder="ここにYouTubeの動画リンクを添付しよう"
                  style={{
                    border: 'none',
                    width: '100%',
                    resize: 'none',
                    outline: 'none',
                    flex: 1,
                    fontSize: '18px',
                    // backgroundColor: 'purple'
                  }}
                  value={url}
                  onChange={handleUrlInputChange}
                />
                
              </div>

              <div>
                {url? <YouTubeVideo videoUrl={url} /> : null}
                {/* <YouTubeVideo videoUrl="https://youtu.be/KqIT4a7X6KE?si=uiRLcAYp5xy5FHCa" /> */}
              </div>

            </Grid>
          </Grid>

        </Box>
      </Container>

    </Box>
  );
}
