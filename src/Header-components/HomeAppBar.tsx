import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import Button from '@mui/material/Button';
import { auth } from '../FirebaseConfig';
import LogOut from '../auth-components/LogOut';
import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import BasicTabs from './BasicTabs';

import { Link } from 'react-router-dom';

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
import LogoutIcon from '@mui/icons-material/Logout';

// サインアウト用
import Modal from '@mui/material/Modal';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// 

// サインアウト用
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

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  mt: 8,
};
//

const settings = [
  { text: 'マイページ', icon: <PersonIcon/> }, 
  { text: '通知', icon: <NotificationsIcon/> }, 
  { text: '下書き一覧', icon: <EditNoteIcon/> }, 
  { text: '記事を作成', icon: <ArticleIcon/> }, 
  { text: '本を執筆', icon: <MenuBookIcon/> }, 
  { text: '動画を投稿', icon: <MovieIcon/> }, 
  { text: 'チーム', icon: <GroupIcon/> }, 
  { text: '設定', icon: <SettingsIcon/> }, 
  { text: 'サインアウト', icon: <LogoutIcon/> }
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.10),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  color: 'black' // color
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function HomeAppBar() {

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

  const handleClick = (path: string) => {
    // 引数として受け取ったパスに遷移する
    window.location.href = path;
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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



  const handleMenuItemClick = (menuItemText: string) => {
    switch (menuItemText) {
      case 'マイページ':
        window.location.href = '/mypage'
        break;
      case '通知':
        window.location.href = '/notification'
        break;
      case '下書き一覧':
        window.location.href = '/draft'
        break;
      case '記事を作成':
        window.location.href = '/makeArticle'
        break;
      case '本を執筆':
        window.location.href = '/makeBook'
        break;
      case '動画を投稿':
        window.location.href = '/makeMovie'
        break;
      case 'チーム':
        window.location.href = '/team'
        break;
      case '設定':
        window.location.href = '/setting'
        break;
      case 'サインアウト':
        handleOpen()
        break;
      default:
        break;
    }
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
                    display: { xs: 'none', sm: 'block' },
                    backgroundColor: 'orange',
                    color: 'white',
                    px: 2, // 左右のパディングを追加
                    borderRadius: 1
                  }}
                >
                    <Typography variant="h6" noWrap component="div">
                      Forest
                    </Typography>
                </Box>
              </Link>
              
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>

              <Box sx={{ flexGrow: 1 }} />

              {user? (
                <>
                  <Button onClick={() => handleClick("/post")} variant="outlined" sx={{ mr: 1, color: '#555555' }} color='inherit'>post</Button>
                  <LogOut/>

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                            sx={{ display: 'flex', alignItems: 'center' }}
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
                            本当にサインアウトしますか？
                          </Typography>
                          <Box sx={buttonContainerStyle}>
                            <Button variant='outlined' onClick={logout} sx={{ flex: 1, mr: 1 }}>はい</Button>
                            <Button variant='outlined' onClick={handleClose} sx={{ flex: 1, ml: 1 }}>いいえ</Button>
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
            <BasicTabs/>
          </AppBar>

        </Box>
      )}
    </>
  );
}