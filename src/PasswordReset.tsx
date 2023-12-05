import React, { useState } from "react";
import {
  Avatar,
  Alert,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { usePasswordReset } from "./usePasswordReset";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";


export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const { success, error, passwordReset } = usePasswordReset();
  const {user, loading} = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    passwordReset(email);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset password
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            send
          </Button>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item>
              {/* <Link href="signIn" variant="body2">
                Remember password? Sign in
              </Link> */}
              {(!loading && user)? (
          <Link href="/mypage" variant="body2">
            go back to your page
          </Link>
        ) : (              <Link href="signIn" variant="body2">
        Remember password? Sign in
      </Link>)}
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
        <Alert severity="error">Could not send to your email address</Alert>
      )}
      {success && (
        <Alert severity="success">Successfully sent to your email address</Alert>
      )}
    </Container>
  );
}