import { useState, ChangeEvent, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import * as marked from 'marked';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import TableChartIcon from '@mui/icons-material/TableChart';

import { useAuth } from '../AuthContext';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { useLocation, useNavigate } from 'react-router-dom';

import MyBlogList from '../Item-components/myBlogList';


export default function Draft() {
  const [markdownInput, setMarkdownInput] = useState<string>('');
  const [htmlOutput, setHtmlOutput] = useState<string>('');

  const {user, loading} = useAuth();
  const [item_category, setItemCategory] = useState(''); // ステートとして初期値を設定
  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    setMarkdownInput(inputText);

    // マークダウンをHTMLに変換してプレビューに表示
    const htmlText = marked.parse(inputText);
    setHtmlOutput(htmlText);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  // ボタンがクリックされたときの処理を定義
  const handleCodeButtonClick = () => {
    // ここにコードボタンがクリックされたときの処理を追加
    console.log('Code button clicked');
  };

  const handleImageButtonClick = () => {
    // ここにイメージボタンがクリックされたときの処理を追加
    console.log('Image button clicked');
  };

  const handleTableButtonClick = () => {
    // ここにテーブルボタンがクリックされたときの処理を追加
    console.log('Table button clicked');
  };

  // タブの設定
  const [value, setValue] = useState('1');
  const handleChange = async (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    // タブがクリックされたときにリンクに遷移
    if (newValue === '1') {
      navigate("/draft/")
    } else if (newValue === '2') {
      navigate("/draft/book")
    } else if (newValue === '3') {
      navigate("/draft/movie")
    }

    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    await setItemCategory(lastSegment);

  };

  useEffect(() => {
  
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    setItemCategory(lastSegment);

  }, [user, loading]);

  return (
    <Box sx={{ flexGrow: 1 }}>

      <Container
        // sx={{backgroundColor: 'green'}}
      >
        {/* <Box
          sx={{
            flexGrow: 1,
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: 'red'
          }}
        > */}

          {/* <Grid
            container
            spacing={0}
            sx={{
              backgroundColor: 'yellow',
              marginTop: '20px',
              flex: 1
            }}
          > */}

            <Box sx={{ width: '100%', typography: 'body1',}} >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Blog" value="1" />
                    <Tab label="Book" value="2" />
                    <Tab label="Movie" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1"><MyBlogList/></TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </Box>


          {/* </Grid> */}

        {/* </Box> */}
      </Container>

    </Box>
  );
}
