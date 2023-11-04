import { useState, ChangeEvent, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import * as marked from 'marked';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import TableChartIcon from '@mui/icons-material/TableChart';
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { httpBlogMake } from '../http-components/http_blog_make';
import { httpBlogPublish } from '../http-components/http_blog_publish';

import { useAuth } from '../AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { httpBlogUpdate } from '../http-components/http_blog_update';
import { httpFetcher } from '../http-components/http_fetcher';

import useSWR from "swr";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

interface BlogData {
  id: string;
  title: string;
  content: string;
  user_id: string;
  birth_time: string;
  update_time: string;
  publish: boolean;
}

export default function MakeBlog() {
  const [title, setTitle] = useState<string>('');
  const [markdownInput, setMarkdownInput] = useState<string>('');
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  const [data, setData] = useState(null);

  const {user, loading} = useAuth();
  const [blog_id, setBlogId] = useState('');
  const location = useLocation();

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    setMarkdownInput(inputText);

    // マークダウンをHTMLに変換してプレビューに表示
    const htmlText = marked.parse(inputText);
    setHtmlOutput(htmlText);

    httpBlogUpdate(blog_id, title, inputText)
  };

  const handleTitleInputChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    await setTitle(input); // タイトルの更新が完了するまで待つ
    await httpBlogUpdate(blog_id, input, markdownInput); // タイトルの更新後に更新処理を実行
  };  

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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


  // レンダリング時にポスト
  useEffect(() => {
    // const PostData = async () => {
    //   while (loading) {
    //     await new Promise(resolve => setTimeout(resolve, 500)); // 0.5秒ごとに確認する例
    //   }
    //   if (user) {
    //     const result = await httpBlogMake(user.uid);
    //     setBlogId(result); // ステートを更新
    //   }
    // };
    // PostData();
    
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    setBlogId(lastSegment);

    // ここで改めて、getリクエスト送りたい！
    // GETリクエストの定型文！
    // const { data: blog, error } = useSWR<BlogData[]>(
    //   "http://localhost:8080/blog",
    //   httpFetcher
    // );

    // ここで、パラメータ or パスの末尾 として、blog_idをバックエンドに送る必要がある
    // さらにその送ったblog_idを受け取ってパースする処理をバックエンドに記述する必要がある

    // このcomponentの読み込み＝blogの作成、に同期させて作った作ったblogデータを
    // ここで、取得しているけど、必要ある？
    httpFetcher(`http://localhost:8080/blog/${lastSegment}`)
    .then(result => {
      setData(result);
      // デバック用
      console.log(result);
      setTitle(result.title);
      setMarkdownInput(result.content);
      // マークダウンをHTMLに変換してプレビューに表示
      const htmlText = marked.parse(result.content);
      setHtmlOutput(htmlText);
    });
  
  }, [user, loading]);
  
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [isDraft, setIsDraft] = useState(false);

  const toggleSwitch = () => {
    setIsDraft(!isDraft);
  };

  const navigate = useNavigate();

  // 公開 or 下書き保存
  const handlePutRequest = () => {
    // if (isDraft) {
      httpBlogPublish(blog_id, isDraft)
    // }
    navigate("/draft")
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
                  placeholder="記事のタイトル"
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
                  onChange={handleInputChange}
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
