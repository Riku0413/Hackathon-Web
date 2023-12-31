import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../AuthContext'; // AuthContext.js のファイルパスを指定

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const location = useLocation(); // 現在のURLを取得

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const [user, setUser] = useState<User | null>(null);
  // // ここの Loading 判定が必要かどうかはしっかり考える必要がある
  // const [loading, setLoading] = useState(true);
  // // ログインしているかどうかをここでもしっかり判定する
  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser: User | null) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });
  // }, []);

  const user = useAuth();

  useEffect(() => {
    // if (user) {
    //   // URLに基づいて選択中のタブを切り替える
    //   switch (location.pathname) {
    //     case '/':
    //       setValue(0);
    //       break;
    //     case '/favorite':
    //       setValue(1);
    //       break;
    //     case '/blog':
    //       setValue(2);
    //       break;
    //     case '/book':
    //       setValue(3);
    //       break;
    //     case '/video':
    //       setValue(4);
    //       break;
    //     case '/work':
    //       setValue(5);
    //       break;
    //     default:
    //       setValue(0);
    //       break;
    //   }  
    // } else {
      switch (location.pathname) {
        case '/':
          setValue(0);
          break;
        case '/blog':
          setValue(1);
          break;
        case '/book':
          setValue(2);
          break;
        case '/video':
          setValue(3);
          break;
        case '/work':
          setValue(4);
          break;
        default:
          setValue(5);
          break;
      }  
    // }
    // setLoading(false);
  }, [location, user]);
  //  ここら辺のlocatinoやuserなどの依存性の設定によってレンダリングに影響が出る
  //  タブが正しく選択された状態から崩れる！

  return (
    <>
    
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons={false}
            aria-label="basic tabs example"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'orange', // アンダーバーの色をオレンジに変更
                '& .Mui-selected': {
                  color: 'orange', // 選択中のタブをオレンジ色に変更
                },
              },
            }}
          >

            <Tab
              label="latest"
              component={Link}
              to="/"
              {...a11yProps(1)}
              sx={{
                '&.Mui-selected': {
                  color: 'orange', // オレンジ色に変更
                },
              }}
            />

            {/* {user? (
              <Tab
                label="favorite"
                component={Link}
                to="/favorite"
                {...a11yProps(6)}
                sx={{
                  '&.Mui-selected': {
                    color: 'orange', // オレンジ色に変更
                  },
                }}
              />
              ) : (
                null
                )
            } */}

            <Tab
              label="blog"
              component={Link}
              to="/blog"
              {...a11yProps(2)}
              sx={{
                '&.Mui-selected': {
                  color: 'orange', // オレンジ色に変更
                },
              }}
            />
            <Tab
              label="book"
              component={Link}
              to="/book"
              {...a11yProps(3)}
              sx={{
                '&.Mui-selected': {
                  color: 'orange', // オレンジ色に変更
                },
              }}
            />
            <Tab
              label="video"
              component={Link}
              to="/video"
              {...a11yProps(4)}
              sx={{
                '&.Mui-selected': {
                  color: 'orange', // オレンジ色に変更
                },
              }}
            />
            <Tab
              label="work"
              component={Link}
              to="/work"
              {...a11yProps(5)}
              sx={{
                '&.Mui-selected': {
                  color: 'orange', // オレンジ色に変更
                },
              }}
            />
          </Tabs>
        </Box>
      </Box>
      

    </>
  );
}