import { useState, ChangeEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import * as marked from 'marked';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import TableChartIcon from '@mui/icons-material/TableChart';

import { Link } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function MakeArticle() {
  const [markdownInput, setMarkdownInput] = useState<string>('');
  const [htmlOutput, setHtmlOutput] = useState<string>('');

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






  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };





  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed"  sx={{backgroundColor: "white"}}>
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
                  Forest
                </Typography>
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Button color="primary">下書き保存</Button>
          <Button color="primary">公開設定</Button>

        </Toolbar>
      </AppBar>

      <Container
        // sx={{backgroundColor: 'green'}}
      >
        <Box
          sx={{
            flexGrow: 1,
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: 'red'
          }}
        >

          <Grid
            container
            spacing={0}
            sx={{
              // backgroundColor: 'yellow',
              marginTop: '20px',
              flex: 1
            }}
          >
            <Grid
              item
              xs={12}
              md={12}
              // sx={{ backgroundColor: 'orange' }}
            >
              <div
                style={{
                  margin: '20px',
                  marginBottom: 0, // だいたい
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  // backgroundColor: 'purple',
                }}
              >
                <TextareaAutosize
                  placeholder="記事のタイトル"
                  style={{
                    border: 'none',
                    width: '100%',
                    resize: 'none',
                    outline: 'none',
                    flex: 1,
                    fontSize: '24px',
                    // backgroundColor: 'purple'
                  }}
                />
              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={0}
            sx={{
              // backgroundColor: 'yellow',
              flex: 1
            }}
          >
            <Grid 
              item 
              xs={12} 
              md={12} 
              // sx={{ backgroundColor: 'orange' }}
            >
              <div
                style={{
                  margin: '20px',
                  marginBottom: 0, // むりやり
                  padding: '5px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '20px',
                  display: 'flex',
                  // flexDirection: 'column',
                  // backgroundColor: 'purple',
                }}
              >

                <IconButton color='primary' onClick={handleCodeButtonClick}>
                  <CodeIcon />
                </IconButton>
                <IconButton color='primary' onClick={handleImageButtonClick}>
                  <ImageIcon />
                </IconButton>
                <IconButton color='primary' onClick={handleTableButtonClick}>
                  <TableChartIcon />
                </IconButton>

              </div>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={0}
            // sx={{backgroundColor: 'lightgreen'}}
          >

            <Grid
              item
              xs={6}
              md={6}
              // sx={{backgroundColor: 'blue'}}
            >
              <div
                style={{
                  margin: '20px',
                  padding: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  // backgroundColor: 'pink'
                }}
              >
                <TextareaAutosize
                  placeholder="ここにMarkdown記法で書いてみよう"
                  style={{
                    border: 'none',
                    width: '100%',
                    resize: 'none',
                    outline: 'none',
                    flex: 1,
                    // backgroundColor: 'purple'
                  }}
                  value={markdownInput}
                  onChange={handleInputChange}
                />
              </div>
            </Grid>

            <Grid
              item
              xs={6}
              md={6}
              // sx={{backgroundColor: 'brown'}}
            >
              <div
                style={{
                  margin: '20px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '3px',
                  paddingBottom: '0',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  minHeight: '237px',
                  display: 'flex',
                  flexDirection: 'column',
                  // backgroundColor: 'purple'
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: htmlOutput }} style={{ flex: 1 }} />
              </div>
            </Grid>

          </Grid>

        </Box>
      </Container>

    </Box>
  );
}
