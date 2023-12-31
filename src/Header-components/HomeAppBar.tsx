import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { auth } from '../FirebaseConfig';
import { useState } from 'react';
import BasicTabs from './BasicTabs';
import SearchBar from './SearchBar';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MovieIcon from '@mui/icons-material/Movie';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../AuthContext'; // AuthContext.js のファイルパスを指定
// サインアウト用
import Modal from '@mui/material/Modal';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// 
import { httpBlogMake } from '../http-components/http_blog_make';
import { httpBookMake } from '../http-components/http_book_make';
import { httpVideoMake } from '../http-components/http_video_make';
import { httpWorkMake } from '../http-components/http_work_make';


// サインアウト用スタイル
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300, // 幅を調整
  height: 150, // 高さも同じ値に設定して正方形にする
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// スタイル
const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  mt: 8,
};
//

// メニューボタン一覧
const settings = [
  { text: 'マイページ', icon: <PersonIcon/>, link: "/mypage" }, 
  { text: 'カリキュラム', icon: <AutoStoriesIcon/>, link: "/curriculum" }, 
  { text: '下書き一覧', icon: <EditNoteIcon/>, link: "/draft" }, 
  { text: '記事を作成', icon: <ArticleIcon/>, link: "/makeBlog" }, 
  { text: '本を執筆', icon: <MenuBookIcon/>, link: "/makeBook" }, 
  { text: '動画を投稿', icon: <MovieIcon/>, link: "/makeVideo" }, 
  { text: '作品を投稿', icon: <AppShortcutIcon/>, link: "/makeWork" }, 
  { text: 'チーム', icon: <GroupIcon/>, link: "/team" }, 
  { text: 'IT用語辞典', icon: <LibraryBooksIcon/>, link: "/dictionary" }, 
  { text: 'サインアウト', icon: <LogoutIcon/> }
];

export default function HomeAppBar() {

  const {user, loading} = useAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // 引数として受け取ったパスに遷移する
  const handleClick = (path: string) => {
    window.location.href = path;
  };

  const handleSearchClick = () => {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has('q')) {
      // qパラメータが存在しない場合のみ遷移
      window.location.href = '/search';
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  // サインアウト用
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const logout = async () => {
    // firebaseの関数によりログアウト
    await signOut(auth);
    navigate('/');
  }
  //

  const handleMenuItemClick = async (menuItemText: string) => {
    switch (menuItemText) {
      case 'マイページ':
        window.location.href = '/mypage'
        break;
      case 'カリキュラム':
        window.location.href = '/curriculum'
        break;
      case '下書き一覧':
        window.location.href = '/draft'
        break;
      case '記事を作成':
        
        if (user) {
          const result = await httpBlogMake(user.uid);
          navigate(`/makeBlog/${result}`);
        }
        break;
        
      case '本を執筆':

        // window.location.href = '/makeBook'
        if (user) {
          const result = await httpBookMake(user.uid);
          navigate(`/makeBook/${result}`);
        }
        break;

      case '動画を投稿':

        // window.location.href = '/makeMovie'
        if (user) {
          const result = await httpVideoMake(user.uid);
          navigate(`/makeVideo/${result}`);
        }
        break;

      case '作品を投稿':

        // window.location.href = '/makeMovie'
        if (user) {
          const result = await httpWorkMake(user.uid);
          navigate(`/makeWork/${result}`);
        }
        break;
        
      case 'チーム':
        window.location.href = '/team'
        break;
      case 'IT用語辞典':
        window.location.href = 'https://wa3.i-3-i.info/index.html'
        break;
      case 'サインアウト':
        handleOpen()
        break;
      default:
        break;
    }
  };
  
  const location = useLocation();
  let content = null;

  if (location.pathname === '/'
   || location.pathname === '/blog' 
   || location.pathname === '/book'
   || location.pathname === '/video' 
   || location.pathname === '/work' 
   || location.pathname === '/favorite' 
   || location.pathname === '/result' 
   ) {
    content = <BasicTabs />;
  } else if (location.pathname === '/search') {
    content = <SearchBar />;
  } else {
    content = <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box>;
  }
  
  // BasicTabs を二重でレンダリングするとバグるから注意！！！
  // あと上述のレンダリング構文はパスの語尾が完全一致する場合と思われる

  let marginTopValue = '150px'; // デフォルトの marginTop 値

  // ここの設定がなぜかうまくいかない！！
  // パスによって marginTop 値を設定
  if (location.pathname === '/search') {
    marginTopValue = '200px'; // 例: 特定のパスに対する marginTop 値
  } else if (location.pathname.startsWith('/draft/')) {
    marginTopValue = '80px'; // 例: 特定のパスに対する marginTop 値
  }

  const extractInitials = (email: string) => {
    const firstChar = email.charAt(0);
    return firstChar.toUpperCase();
  };  
  
  return (
    <>
      {!loading && (
        <Box sx={{ flexGrow: 1 }}>
          {/* ↓ 影は消しておく */}
          <AppBar position="fixed" sx={{backgroundColor: "white"}} elevation={0}> 
            <Toolbar>

              <Link to="/" style={{ textDecoration: 'none' }}>
                <Box 
                  sx={{
                    // display: { xs: 'none', sm: 'block' },
                    backgroundColor: 'orange',
                    color: 'white',
                    px: 2, // 左右のパディングを追加
                    borderRadius: 1
                  }}
                >
                    <Typography variant="h6" noWrap component="div">
                      Start
                    </Typography>
                </Box>
              </Link>

              <Box sx={{ flexGrow: 1 }} />

              {/* <IconButton
                color="default" // ボタンの色を指定（primaryは例です）
                component={Link}
                to="/search"
              >
                <SearchIcon />
              </IconButton> */}

              <IconButton
                color="default"
                onClick={handleSearchClick}
              >
                <SearchIcon />
              </IconButton>

              {user? (
                <>
                  <IconButton
                    color="default" // ボタンの色を指定（primaryは例です）
                    component={Link}
                    to="/notification"
                  >
                    <NotificationsIcon />
                  </IconButton>

                  {/* 無理やり余白を作る */}
                  <Box sx={{ marginRight: '8px' }} /> 
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{backgroundColor: 'orangered'}} /> */}
                        {user.email? (
                            <Avatar alt="a" sx={{backgroundColor: 'orangered'}}>
                              {extractInitials(user.email)}
                            </Avatar>
                          ) : (null)
                        }
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                          <Button
                            onClick={() => handleMenuItemClick(setting.text)}
                            sx={{
                              display: 'flex',
                              alignItems: 'center', 
                              color: 'dimgray', 
                              // backgroundColor: "yellow" 
                            }}
                          >
                            {setting.icon}
                            <Typography textAlign="center" sx={{ marginLeft: '8px' }}>
                              {setting.text}
                            </Typography>
                          </Button>
                        </MenuItem>
                      ))}
                      
                      {/* サインアウト用 */}
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                          Do you really want to sign out?
                          </Typography>
                          <Box sx={buttonContainerStyle}>
                            <Button variant='outlined' onClick={logout} sx={{ flex: 1, mr: 1 }}>yes</Button>
                            <Button variant='outlined' onClick={handleClose} sx={{ flex: 1, ml: 1 }}>no</Button>
                          </Box>
                        </Box>
                      </Modal>
                      {/*  */}

                    </Menu>
                  </Box>

                </>
              ) : (
                <>
                  <Button onClick={() => handleClick("/signUp")} variant="outlined" color='inherit' sx={{ mr: 1, color: '#555555', whiteSpace: 'nowrap'}}>sign up</Button>
                  <Button onClick={() => handleClick("/signIn")} variant="outlined" color='inherit' sx={{color: '#555555', whiteSpace: 'nowrap'}}>sign in</Button>
                </>
              )}
              
            </Toolbar>
            
            {/* BasicTabs or SearchBar */}
            {content}

          </AppBar>
        </Box>
      )}      

      {/* Appbarの縦幅分下げる！！ */}
      {/* <div style={{ height: marginTopValue, backgroundColor: "#FDF5E6" }}></div> */}
      
    </>
    
  );
}