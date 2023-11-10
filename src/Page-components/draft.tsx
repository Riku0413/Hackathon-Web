import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import Container from '@mui/material/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import MyBlogList from '../Item-components/myBlogList';
import MyBookList from '../Item-components/myBookList';
import MyVideoList from '../Item-components/myVideoList';


export default function Draft() {

  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('blog');

  
  useEffect(() => {
  
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    if (lastSegment === 'draft') {
      setActiveTab('blog');  
    } else {
      setActiveTab(lastSegment);
    }

  }, []);

  const handleTabChange = async (tab: string) => {
    await setActiveTab(tab);

    // タブがクリックされたときにリンクに遷移
    if (tab === 'blog') {
      navigate("/draft/")
    } else if (tab === 'book') {
      navigate("/draft/book")
    } else if (tab === 'video') {
      navigate("/draft/video")
    }

  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      {/* 本当はこんな感じで、コンポーネントごとに上の余白を定義するべきなんだけど後回し！ */}
      {/* <div style={{ marginTop: "100px" }}></div> */}

      <Container
        // sx={{backgroundColor: 'green'}}
      >
        下書き一覧

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button
              variant={activeTab === 'blog' ? 'contained' : 'outlined'}
              onClick={() => handleTabChange('blog')}
            >
              Blog
            </Button>
            <Button
              variant={activeTab === 'book' ? 'contained' : 'outlined'}
              onClick={() => handleTabChange('book')}
            >
              Book
            </Button>
            <Button
              variant={activeTab === 'video' ? 'contained' : 'outlined'}
              onClick={() => handleTabChange('video')}
            >
              Video
            </Button>
          </ButtonGroup>

          {/* ボタングループの内容 */}
          {activeTab === 'blog' && <MyBlogList />}
          {activeTab === 'book' && <MyBookList />}
          {activeTab === 'video' && <MyVideoList />}
          
        </Box>

      </Container>

    </Box>
  );
}
