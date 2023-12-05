import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// firebase API のプロジェクトの識別情報
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// 識別情報をもとに認証APIを初期化
const app = initializeApp(firebaseConfig);

// 認証機能の行使に必要なauthオブジェクトを生成
export const auth = getAuth(app);