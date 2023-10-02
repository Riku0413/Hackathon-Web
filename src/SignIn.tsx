import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { Navigate, Link } from "react-router-dom";

const SignIn = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    // ブラウザのリロードを回避
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
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
  };

  const [user, setUser] = useState<User | null>(null);

  // コンポーネントのマウントと、認証状態の変化を同期させて管理
  useEffect(() => {
    // この関数自体は、認証状態の変化があれば、useEffectに関わらず勝手に起動する！
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {user ? (
        <Navigate to={`/`} /> // 登録したらトップページにリダイレクト！
      ) : (
        <>
          <h1>新規登録</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>メールアドレス</label>
              <input
                name="email"
                type="email"
                // value属性は、なくても一応、機能する
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                name="password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <button>登録する</button>
            <p>ログインは<Link to={`/login/`}>こちら</Link></p>
            <p>トップページは<Link to={`/`}>こちら</Link></p>
          </form>
        </>
      )}
    </>
  );
};

export default SignIn;