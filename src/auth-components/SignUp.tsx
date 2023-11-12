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
import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { Navigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { httpUserRegister } from '../http-components/http_user_register';
import { httpFetcher } from '../http-components/http_fetcher';

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
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const { user, loading } = useAuth();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const CheckData = async () => {
      try {
        const result = await httpFetcher(`https://hackathon-bafb6ceksa-uc.a.run.app/user/check/${registerUsername}`);
        console.log(result.last_time)
        if (result.id === '') {

          try {
            await createUserWithEmailAndPassword(
              auth,
              registerEmail,
              registerPassword
            );
      
            // createUserWithEmailAndPasswordの処理が完了した後、ユーザーがログイン状態になるのを待つ
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                await httpUserRegister(user.uid, registerUsername);
              }
            });
      
          } catch(error: any) {
            // エラーコードを取得
            const errorCode = error.code;
            // エラーメッセージを設定
            let errorMessage = "エラーが発生しました。";
      
            switch (errorCode) {
              case "auth/weak-password":
                errorMessage = "パスワードは6文字以上にしてください。";
                break;
              case "auth/invalid-email":
                errorMessage = "無効なメールアドレス形式です。正しいメールアドレスを入力してください。";
                break;
              case "auth/email-already-in-use":
                errorMessage = "このメールアドレスはすでに使用されています。別のメールアドレスを試してください。";
                break;
              case "auth/operation-not-allowed":
                errorMessage = "指定したメールアドレス・パスワードは現在使用できません。";
                break;
              default:
                break;
            }
            // エラーメッセージをユーザーに表示
            alert(errorMessage);

          };

        } else {
          console.log('同一ユーザー名が取得されました:', result);
          alert("このユーザー名はすでに使用されています。");
        }
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };
    CheckData();

  };

  return (
    <>
      {!loading && (
        <>
          {user ? (
              <Navigate to={`/`} /> // 登録したらトップページにリダイレクト！
              // user.uid
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
                        Sign up
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
                              value={registerUsername}
                              onChange={(e) => setRegisterUsername(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              autoComplete="email"
                              value={registerEmail}
                              onChange={(e) => setRegisterEmail(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              autoComplete="new-password"
                              value={registerPassword}
                              onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={<Checkbox value="allowExtraEmails" color="primary" />}
                              label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                          </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                          <Grid item>
                            <Link href="/signIn" variant="body2">
                              Already have an account? Sign in
                            </Link>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                  </Container>
                </ThemeProvider>
              </>
            )}
        </>
      )}
    </>
  );
}