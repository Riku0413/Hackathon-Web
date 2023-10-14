import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

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
            />
          </Search>          

        </Toolbar>

        {/* サーチフィールド直下の余白 */}
        <div style={{ marginTop: '25px' }}></div>
        
    </Box>
  );
}