import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useEffect, useState} from 'react';
import useSWR from "swr";
import { httpFetcher } from '../http-components/http_fetcher';
import { useAuth } from '../AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import * as marked from 'marked';

import { httpBlogDelete } from '../http-components/http_blog_delete';


interface BlogData {
  id: string;
  title: string;
  content: string;
  user_id: string;
  birth_time: string;
  update_time: string;
  publish: boolean;
}

export default function BlogDetail() {
  const {user, loading} = useAuth();
  const [blogs, setBlogs] = useState<BlogData[]>();
  const [blog_id, setBlogId] = useState('');
  // const [blog_user_id, setBlogUserId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  const location = useLocation();

  useEffect(() => {

    const pathSegments = location.pathname.split('/');
    // const firstSegment = pathSegments[pathSegments.length - 3];
    // const secondSegment = pathSegments[pathSegments.length - 2];
    const lastSegment = pathSegments[pathSegments.length - 1];
    // setBlogUserId(firstSegment);
    setBlogId(lastSegment);
    
    const fetchData = async () => {
      // console.log(lastSegment)
      await httpFetcher(`http://localhost:8080/blog/${lastSegment}`)
      .then(result => {
        setTitle(result.title);
        setContent(result.content);
        const htmlText = marked.parse(result.content);
        setHtmlOutput(htmlText);
      });
    };

    fetchData(); // データの取得処理を開始

    // GETリクエストの定型文！
    // const { data: blogs, error } = useSWR<BlogData[]>(
    //   `http://localhost:8080/blogs/${user.uid}`,
    //   httpFetcher
    // );
    
    console.log("these are blogs!")

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
    // httpFetcher(`http://localhost:8080/blog/${lastSegment}`)
    // .then(result => {
    //   setData(result);
    //   // デバック用
    //   console.log(result);
    // });
  
  }, [user, loading]);

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
