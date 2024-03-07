import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import * as marked from 'marked';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import TableChartIcon from '@mui/icons-material/TableChart';

import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { httpFetcher } from '../http-components/http_fetcher';
import { auth } from '../FirebaseConfig';
import { Link } from '@mui/material';


export default function MyPage() {
  const [markdownInput, setMarkdownInput] = useState<string>('');
  const [htmlOutput, setHtmlOutput] = useState<string>('');

  const [userName, setUserName] = useState("");
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const [GithubLink, setGithubLink] = useState("");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          httpFetcher(`http://localhost:8080/user/${user.uid}`)
          .then(result => {
            setUserName(result.user_name);
            setSelfIntroduction(result.introduction);
            setGithubLink(result.git_hub);
            console.log(result);
          });
        }
      });
    };

    fetchData(); // データの取得処理を開始
    
  }, [user, loading]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    setMarkdownInput(inputText);

    // マークダウンをHTMLに変換してプレビューに表示
    const htmlText = marked.parse(inputText);
    setHtmlOutput(htmlText);
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

  const handleButtonClick = () => {
    navigate('/profile/');
  };

  const handleResetButtonClick = () => {
    navigate('/resetPassword/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>

　　　 <div style={{ height: "120px" }}></div>

      <Container
      >
        {/* <Box
          sx={{
            flexGrow: 1,
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: 'red'
          }}
        > */}

          {/* <Grid
            container
            spacing={0}
            sx={{
              backgroundColor: 'yellow',
              marginTop: '20px',
              flex: 1
            }}
          > */}
            <Grid
              item
              xs={12}
              md={12}
              // sx={{ backgroundColor: 'orange' }}
            >
              <div
                style={{
                  margin: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  // backgroundColor: 'purple',
                }}
              >
                <div
                style={{
                  margin: '10px',
                  padding: '5px',
                  // border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '50px',
                  minWidth: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  // backgroundColor: 'purple',

                  justifyContent: "center",
                  alignItems: "center",
                }}
                >
                  <Avatar
                    alt="Remy Sharp" 
                    src="/static/images/avatar/2.jpg" 
                    sx={{backgroundColor: 'orangered', width: '80px', height: '80px', fontSize: '40px'}}
                  />
                  {/* ここにユーザー名 */}
                  {/* {user && user.email? ( */}
                    {userName}
                  
                </div>
                <Grid container spacing={0}
                  // sx={{backgroundColor: 'lightgreen'}}
                >
                  <Grid item xs={6} md={6}
                      // sx={{backgroundColor: 'blue'}}
                    >
                      <div
                        style={{
                          margin: '20px',
                          // border: '1px solid #ccc',
                          borderRadius: '4px',
                          minHeight: '50px',
                          display: 'flex',
                          flexDirection: 'column',
                          // backgroundColor: 'pink'
                          alignItems: 'center',
                        }}
                      >
                        <Button variant="contained" color='warning' style={{ textTransform: 'none', width: '200px' }} onClick={handleButtonClick}>Update profile</Button>
                      </div>
                    </Grid>
                    <Grid item xs={6} md={6}
                      // sx={{backgroundColor: 'blue'}}
                    >
                      <div
                        style={{
                          margin: '20px',
                          // border: '1px solid #ccc',
                          borderRadius: '4px',
                          minHeight: '50px',
                          display: 'flex',
                          flexDirection: 'column',
                          // backgroundColor: 'pink'
                          alignItems: 'center',
                        }}
                      >
                        <Button variant="contained" color='warning' style={{ textTransform: 'none', width: '200px' }} onClick={handleResetButtonClick}>Reset password</Button>
                      </div>

                      {/* {userName} */}
                      
                    </Grid>
                    
                  </Grid>
                  
                  <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <strong style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Self-Introduction</strong>
              <hr style={{ width: '93%', borderTop: '1px solid #ccc' }} />
              {selfIntroduction}

              <strong style={{ fontSize: '1.5rem', marginBottom: '10px', marginTop: '20px' }}>GitHub</strong>
              <hr style={{ width: '93%', borderTop: '1px solid #ccc' }} />
              <Link href={GithubLink} target="_blank" rel="noopener noreferrer" sx={{mb: '20px'}}>
                        link to my github
                      </Link>
              </div>
              


              </div>
            </Grid>
          {/* </Grid> */}

          {/* <Grid
            container
            spacing={0}
            sx={{
              // backgroundColor: 'yellow',
              flex: 1
            }}
          > */}

          {/* </Grid> */}

          {/* <Grid
            container
            spacing={0}
            sx={{
              // backgroundColor: 'yellow',
              flex: 1
            }}
          > */}
 
          {/* </Grid> */}

        {/* </Box> */}
      </Container>

      <div style={{ height: "100px" }}></div>

    </Box>
  );
}
