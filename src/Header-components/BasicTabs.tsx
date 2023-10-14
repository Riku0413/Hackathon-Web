import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { Link, useLocation } from 'react-router-dom';
import { auth } from '../FirebaseConfig';
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';

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

  useEffect(() => {
    if (user) {
      // URLに基づいて選択中のタブを切り替える
      switch (location.pathname) {
        case '/':
          setValue(0);
          break;
        case '/favorite':
          setValue(1);
          break;
        case '/blog':
          setValue(2);
          break;
        case '/books':
          setValue(3);
          break;
        case '/movie':
          setValue(4);
          break;
        default:
          setValue(0);
          break;
      }  
    } else {
      switch (location.pathname) {
        case '/':
          setValue(0);
          break;
        case '/blog':
          setValue(1);
          break;
        case '/books':
          setValue(2);
          break;
        case '/movie':
          setValue(3);
          break;
        default:
          setValue(4);
          break;
      }  
    }
    // setLoading(false);
  }, [location]);
  
  return (
    <>
      {!loading && (
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
              label="trend"
              component={Link}
              to="/"
              {...a11yProps(6)}
              sx={{
                '&.Mui-selected': {
                  color: 'orange', // オレンジ色に変更
                },
              }}
            />

            {user? (
              <Tab
                label="favorite"
                component={Link}
                to="/favorite"
                {...a11yProps(5)}
                sx={{
                  '&.Mui-selected': {
                    color: 'orange', // オレンジ色に変更
                  },
                }}
              />
              ) : (
                null
                )
            }

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
              label="books"
              component={Link}
              to="/books"
              {...a11yProps(3)}
              sx={{
                '&.Mui-selected': {
                  color: 'orange', // オレンジ色に変更
                },
              }}
            />
            <Tab
              label="movie"
              component={Link}
              to="/movie"
              {...a11yProps(4)}
              sx={{
                '&.Mui-selected': {
                  color: 'orange', // オレンジ色に変更
                },
              }}
            />
          </Tabs>
        </Box>
      </Box>
      )}

    </>
  );
}