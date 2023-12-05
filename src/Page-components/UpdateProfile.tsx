import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { useAuth } from '../AuthContext';
import { httpFetcher } from '../http-components/http_fetcher';
import { useEffect } from 'react';
import { httpUserUpdate } from '../http-components/http_user_update';
import { useNavigate } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function UpdateProfile() {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      await httpUserUpdate(user.uid, userName, selfIntroduction, GithubLink);
      navigate('/mypage');
    }
  };

  return (
              <>
                <ThemeProvider theme={defaultTheme}>

                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                      sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Profile
                      </Typography>
                      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="UserName"
                              label="User Name"
                              name="UserName"
                              autoComplete="username"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="Introduction"
                            label="Self-Introduction"
                            placeholder="write your introduction"
                            multiline
                            minRows={4}
                            value={selfIntroduction}
                            onChange={(e) => setSelfIntroduction(e.target.value)}
                          />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              name="password"
                              label="GitHub Link"
                              placeholder="set your github link"
                              id="password"
                              autoComplete="new-password"
                              value={GithubLink}
                              onChange={(e) => setGithubLink(e.target.value)}
                            />
                          </Grid>
                          
                        </Grid>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Update
                        </Button>
                        <Grid container justifyContent="flex-end">
                          <Grid item>
                            <Link href="/mypage" variant="body2">
                              go back to your page
                            </Link>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                  </Container>
                </ThemeProvider>
              </>
  );
}