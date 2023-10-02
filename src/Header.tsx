import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "./FirebaseConfig";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {

  const [user, setUser] = useState<User | null>(null);
  // ここの Loading 判定が必要かどうかはしっかり考える必要がある
  const [loading, setLoading] = useState(true);
  // ログインしているかどうかをここでもしっかり判定する
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const logout = async () => {
    // firebaseの関数によりログアウト
    await signOut(auth);
    navigate("/");
  }

  const handleClick = (path: string) => {
    // 引数として受け取ったパスに遷移する
    window.location.href = path;
  };

  return (
    <>
      {!loading && (
        <>
          <div className="header-component">

            <header className="header-1">
              <div className="header-1-contents">
                <div className="title">
                  Forest
                </div>
                <div className="side-menu-list">
                  {!user ? (
                    // userがfalseの場合に表示する要素
                    <div>
                      <button onClick={() => handleClick("/signIn/")} className="side-menu">新規登録</button>
                      <button onClick={() => handleClick("/login/")} className="side-menu">ログイン</button>
                    </div>
                  ) : (
                    // userがtrueの場合に表示する要素
                    <div>
                      <button onClick={() => handleClick("/mypage/")} className="side-menu">マイページ</button>
                      <button onClick={() => handleClick("/post/")} className="side-menu">投稿する</button>
                      <button onClick={logout} className="side-menu">ログアウト</button>
                    </div>
                  )}
                </div>
              </div>
            </header>

            <nav className="header-2">
              <div className="header-2-categories">
                {user ? (
                  <>
                    <Link to="/favorite" className="item-category">お気に入り</Link>
                    <Link to="/trend" className="item-category">トレンド</Link>
                  </>
                ) : ( null )}
                <Link to="/" className="item-category">ホーム</Link>
                {/* ここは Link にしないと、Form.tsx 内の TypeScript の再レンダリングが行われないらしい */}
                <Link to="/blog" className="item-category">ブログ</Link>
                <Link to="/books" className="item-category">ブックス</Link>
                <Link to="/movie" className="item-category">ムービー</Link>
              </div>
            </nav>

          </div>
        </>
      )}
    </>
  );
};

export default Header;