import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
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

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    <>
    {user ? (
      <Navigate to={`/`} />
    ) : (
      <>
        <h1>ログインページ</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>メールアドレス</label>
            <input
              name="email"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div>
            <label>パスワード</label>
            <input
              name="password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <button>ログイン</button>
          <p>新規登録は<Link to={`/signIn/`}>こちら</Link></p>
          <p>トップページは<Link to={`/`}>こちら</Link></p>
        </form>
      </>
    )}
    </>
  );
};

export default Login;