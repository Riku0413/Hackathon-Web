import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useEffect, useState} from 'react';
import { httpFetcher } from '../http-components/http_fetcher';
import { useAuth } from '../AuthContext';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import * as marked from 'marked';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import { httpCommentPost } from '../http-components/http_comment_post';


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
  const [blog_id, setBlogId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  const location = useLocation();
  const [myComment, setMyComment] = useState('');
  const [comments, setComments] = useState<CommentData[]>();

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    setBlogId(lastSegment);
    
    const fetchData = async () => {
      await httpFetcher(`http://localhost:8080/blog/${lastSegment}`)
      .then(result => {
        setTitle(result.title);
        setContent(result.content);
        const htmlText = marked.parse(result.content);
        setHtmlOutput(htmlText);
      });

      // コメント一覧をとってくる
      try {
        const result = await httpFetcher(`http://localhost:8080/comments/blog/${lastSegment}`);
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
      const res = await httpFetcher(`http://localhost:8080/user/${user.uid}`)
      await httpCommentPost(user.uid, res.user_name, 'blog', blog_id, myComment)
      await setMyComment('');
      // コメント一覧をとってくる
      try {
        const result = await httpFetcher(`http://localhost:8080/comments/blog/${blog_id}`);
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
            >
              <div
                style={{
                  margin: '20px',
                  borderRadius: '4px',
                  minHeight: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  id="outlined-textarea"
                  placeholder="Write your comment"
                  multiline
                  minRows={3}
                  value={myComment}
                  onChange={handleMyCommentChange}
                />
              </div>
              <Stack spacing={2} direction="row" justifyContent="flex-end" style={{ marginRight: '30px' }} >
                <Button variant="contained" color='warning' onClick={handlePost}>POST</Button>
              </Stack>
            </Grid>

          </Grid>

        </Box>
      </Container>

      <div style={{height: "50px"}}></div>

    </Box>
  );
}
