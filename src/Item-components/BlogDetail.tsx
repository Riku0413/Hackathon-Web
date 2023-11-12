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
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


import { httpBlogDelete } from '../http-components/http_blog_delete';
import { httpCommentPost } from '../http-components/http_comment_post';
import { httpLikePost } from '../http-components/http_like_post';
import { httpLikeDelete } from '../http-components/http_like_delete';


interface BlogData {
  id: string;
  title: string;
  content: string;
  user_id: string;
  birth_time: string;
  update_time: string;
  publish: boolean;
}

interface CommentData {
  id: string;
  user_id: string;
  user_name: string
  blog_id: string;
  content: string;
  birth_time: string;
  update_time: string;
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
  const [myComment, setMyComment] = useState('');
  const [comments, setComments] = useState<CommentData[]>();
  const [user_name, setUserName] = useState('');

  const [isLiked, setIsLiked] = useState(false);
  const [likesNumber, setLikesNumber] = useState(0);
  const [like_id, setLikeId] = useState('');

  // const handleButtonClick = async () => {
  //   await setIsLiked(!isLiked);
  //   if (user) {
  //     if (isLiked) {
  //       await setLikesNumber(likesNumber+1);
  //       await httpLikePost(user.uid, 'blog', blog_id);
  //       const result = await httpFetcher(`http://localhost:8080/like/blog/${blog_id}/${user.uid}`)
  //       await setLikeId(result.id);
  //     } else {
  //       await setLikesNumber(likesNumber-1);
  //       await httpLikeDelete('blog', blog_id, like_id);
  //       await setLikeId('');
  //     }
  //   }
  // };
  

  useEffect(() => {

    const pathSegments = location.pathname.split('/');
    // const firstSegment = pathSegments[pathSegments.length - 3];
    // const secondSegment = pathSegments[pathSegments.length - 2];
    const lastSegment = pathSegments[pathSegments.length - 1];
    // setBlogUserId(firstSegment);
    setBlogId(lastSegment);
    
    const fetchData = async () => {
      // console.log(lastSegment)
      await httpFetcher(`https://hackathon-bafb6ceksa-uc.a.run.app/blog/${lastSegment}`)
      .then(result => {
        setTitle(result.title);
        setContent(result.content);
        setLikesNumber(result.likes);
        const htmlText = marked.parse(result.content);
        setHtmlOutput(htmlText);
      });

      // if (!loading && user) {
      //   const res = await httpFetcher(`http://localhost:8080/like/blog/${lastSegment}/${user.uid}`)
      //   if (res.id === '') {
      //     await setIsLiked(false);
      //   } else {
      //     await setIsLiked(true);
      //     await setLikeId(res.id);
      //   }
      // }

      // コメント一覧をとってくる
      try {
        const result = await httpFetcher(`https://hackathon-bafb6ceksa-uc.a.run.app/comments/blog/${lastSegment}`);
        setComments(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }

    };

    fetchData(); // データの取得処理を開始
    
    console.log("these are comments!")
  
  }, [user, loading]);

  const handlePost = async () => {
    if (user && blog_id) {
      const res = await httpFetcher(`https://hackathon-bafb6ceksa-uc.a.run.app/user/${user.uid}`)
      await setUserName(res.user_name);
      await httpCommentPost(user.uid, res.user_name, 'blog', blog_id, myComment)
      await setMyComment('');
      // コメント一覧をとってくる
      try {
        const result = await httpFetcher(`https://hackathon-bafb6ceksa-uc.a.run.app/comments/blog/${blog_id}`);
        await setComments(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
  };

  const handleMyCommentChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    await setMyComment(input); // タイトルの更新が完了するまで待つ
  };  

  return (
    <Box sx={{ flexGrow: 1 }}>

      <Container
        // sx={{backgroundColor: 'green'}}
      >
        <Box
          sx={{
            flexGrow: 1,
            marginTop: '30px',
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
                
                <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <strong style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{title}</strong>
              <hr style={{ width: '93%', borderTop: '1px solid #ccc' }} />
              </div>
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
            
              {/* <Button
                onClick={handleButtonClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center', 
                  marginLeft: '12px',
                  color: isLiked ? '#e91e63' : 'dimgray', // テキストの色を設定
                  backgroundColor: isLiked ? 'white' : 'transparent', // 背景色を設定
                  '&:hover': {
                    backgroundColor: isLiked ? 'white' : 'transparent', // ホバー時の背景色を設定
                  },
                }}
              >
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                132

              </Button> */}

            <Grid
              item
              xs={12}
              md={12}
              // sx={{backgroundColor: 'brown'}}
            >


        <div>
             <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <strong style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Comments</strong>
              <hr style={{ width: '93%', borderTop: '1px solid #ccc' }} />
              </div>

          {comments && comments.length > 0 ? (
            <Grid container spacing={0}>
  {comments.map((comment, index) => (
    <Grid item xs={12} md={12} key={index}>
      <div
        style={{
          margin: '20px',
          marginBottom: '0px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingTop: '3px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          minHeight: '100px',
          display: 'flex',
          flexDirection: 'column',
          // backgroundColor: 'purple',
        }}
      >
        <Typography
          id="outlined-read-only-input"
          variant="body1"
          component="div"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline', // ベースラインに揃える
            justifyContent: 'space-between', // 要素間のスペースを均等に配置
            // overflow: 'auto', // 内容がはみ出た場合にスクロールバーを表示
            whiteSpace: 'pre-wrap', // 折り返し
            fontSize: '15px'
          }}
        >
          {comment.user_name ? <div style={{ marginRight: '10px' }}>{comment.user_name}</div> : <div>No name</div>}
          {comment.birth_time ? <div>{comment.birth_time.split(" ")[0]}</div> : null}
        </Typography>
        <Typography
          id="outlined-read-only-input"
          variant="body1"
          component="div"
          style={{
            marginTop: '10px', // content との間に余白
            // overflow: 'auto', // 内容がはみ出た場合にスクロールバーを表示
            whiteSpace: 'pre-wrap', // 折り返し
            fontSize: '20px'
          }}
        >
          {comment.content ? <div>{comment.content}</div> : <div>None</div>}
        </Typography>
      </div>
    </Grid>
  ))}
</Grid>


          ) : (
            null
          )}
        </div>

            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              // sx={{backgroundColor: 'brown'}}
            >
              
              <div
                style={{
                  margin: '20px',
                  // paddingLeft: '20px',
                  // paddingRight: '20px',
                  // paddingTop: '3px',
                  // paddingBottom: '0',
                  // border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  // backgroundColor: 'purple'
                }}
              >


                <TextField
                  id="outlined-textarea"
                  // label="Write your comment"
                  placeholder="Write your comment"
                  multiline
                  minRows={3}
                  value={myComment}
                  onChange={handleMyCommentChange}
                />
        
              </div>
                <Stack spacing={2} direction="row" justifyContent="flex-end" style={{ marginRight: '30px' }} >
                  <Button variant="contained" onClick={handlePost}>POST</Button>
                </Stack>
            </Grid>

          </Grid>

        </Box>
      </Container>

    </Box>
  );
}
