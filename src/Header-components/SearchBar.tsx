import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SearchKeywords from './SearchKeywords';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  border: '1px solid gray', // 枠線の色をグレーに設定
  // backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    // backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '80%',
  [theme.breakpoints.up('sm')]: {
    margin: 'auto',
  },
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
  borderRadius: 20,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    // color: 'blue', // テキストの色を青に設定
  },
  // backgroundColor: "lightblue",
  '&:hover, &.Mui-focused': {
    boxShadow: '0 0 5px 2px orange', // カーソルを合わせた時とフォーカスされた時のボックスシャドウを追加
  },
  width: '100%',
}));

export default function SearchBar() {
  const [searchText, setSearchText] = useState<string>('');
  const [imeComposing, setImeComposing] = useState<boolean>(false);
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get('q');

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && !imeComposing && searchText) {
      // 空欄じゃなくて、Enterキーが押されて、かつ変換中でない場合に検索を実行
      console.log('Searching for:', searchText);
      navigate(`/search?q=${searchText}`);
    }
  };

  // IMEの変換中状態を監視
  useEffect(() => {
    if (qParam) {
      setSearchText(qParam)
    }
    
    const handleCompositionStart = () => {
      setImeComposing(true);
    };
    
    const handleCompositionEnd = () => {
      setImeComposing(false);
    };
    
    document.addEventListener('compositionstart', handleCompositionStart);
    document.addEventListener('compositionend', handleCompositionEnd);
    
    return () => {
      document.removeEventListener('compositionstart', handleCompositionStart);
      document.removeEventListener('compositionend', handleCompositionEnd);
    };
  }, [qParam]);
  
  return (
    <Box sx={{
      flexGrow: 1, 
      borderBottom: 1, 
      borderColor: 'divider', 
      // backgroundColor: "green",
      }}
    >
        <Toolbar>

          <Search>
            <SearchIconWrapper>
              <SearchIcon color='disabled' />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyPress}  
            />
          </Search>          

        </Toolbar>

        {/* サーチフィールド直下の余白 */}
        <div style={{ marginTop: '25px' }}></div>

        {/* <SearchKeywords/> */}
        
    </Box>
  );
}