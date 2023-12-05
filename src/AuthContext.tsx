import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'; // Firebase Authの型と関数をインポート
import { auth } from './FirebaseConfig'; // Firebase Authの初期化ファイルのパスを指定

// ユーザー情報の型を定義
type AuthUser = User | null;

// AuthContextの型を定義
type AuthContextType = {
  user: AuthUser;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
