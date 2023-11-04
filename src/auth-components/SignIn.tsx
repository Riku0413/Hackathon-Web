import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { Navigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import { useAuth } from '../AuthContext';

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

export default function SignUp() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // console.log("submit");

    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log("point 2");
    } catch(error: any) {

      // エラーコードを取得
      const errorCode = error.code;
      // エラーメッセージを設定
      let errorMessage = "エラーが発生しました。";

      switch (errorCode) {
        case "auth/invalid-email":
          errorMessage = "無効なメールアドレス形式です。正しいメールアドレスを入力してください。";
          break;
        case "auth/user-disabled":
          errorMessage = "このメールアドレスは使用できません。";
          break;
        case "auth/user-not-found":
          errorMessage = "登録されていないメールアドレスです。";
          break;
        case "auth/wrong-password":
          errorMessage = "パスワードが間違っています。";
          break;
        default:
          break;
      }

      // エラーメッセージをユーザーに表示
      alert(errorMessage);
    }
  };

  // const [user, setUser] = useState<User | null>(null);
  const {user, loading} = useAuth();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  // });

  return (
    <>
    {!loading && (
    <>
    {user ? (
        <Navigate to={`/`} /> // 登録したらトップページにリダイレクト！
      ) : (
          <>
            <ThemeProvider theme={defaultTheme}>
              <RouterLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    backgroundColor: 'orange',
                    color: 'white',
                    px: 2, // 左右のパディングを追加
                    borderRadius: 1,
                    marginLeft: '30px', // タイトルを左に寄せる
                    marginTop: '30px',   // 上に余白を追加
                    width: 'fit-content', // 幅を指定したサイズに調整
                    height: 'fit-content', // 高さを指定したサイズに調整
                  }}
                >
                    <Typography variant="h6" noWrap component="div" sx={{fontSize: '30px'}}>
                      Forest
                    </Typography>
                </Box>
              </RouterLink>
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
                    Sign in
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      sign in
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="/signUp" variant="body2">
                          {"Don't have an account? Sign up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
              </Container>
            </ThemeProvider>
          </>
        )}
    </>
    )}
      
    </>
  );
}