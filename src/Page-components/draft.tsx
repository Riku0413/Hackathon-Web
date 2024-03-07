import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import Container from '@mui/material/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import MyBlogList from '../Item-components/myBlogList';
import MyBookList from '../Item-components/myBookList';
import MyVideoList from '../Item-components/myVideoList';
import MyWorkList from '../Item-components/myWorkList';

import * as React from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function Draft() {

  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

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
    } else if (tab === 'work') {
      navigate("/draft/work")
    }

  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      {/* 本当はこんな感じで、コンポーネントごとに上の余白を定義するべきなんだけど後回し！ */}
      <div style={{ height: "100px", backgroundColor: "#FDF5E6" }}></div>

      <Container
        sx={{backgroundColor: "#FDF5E6" }}
      >
        Draft List
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <ButtonGroup variant="outlined" color= 'warning' aria-label="outlined button group">
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
            <Button
              variant={activeTab === 'work' ? 'contained' : 'outlined'}
              onClick={() => handleTabChange('work')}
            >
              Work
            </Button>
          </ButtonGroup>

          <ToggleButtonGroup
      color="warning"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="web">Web</ToggleButton>
      <ToggleButton value="android">Android</ToggleButton>
      <ToggleButton value="ios">iOS</ToggleButton>
    </ToggleButtonGroup>
  

          {/* ボタングループの内容 */}
          {activeTab === 'blog' && <MyBlogList />}
          {activeTab === 'book' && <MyBookList />}
          {activeTab === 'video' && <MyVideoList />}
          {activeTab === 'work' && <MyWorkList />}
          
        </Box>

      </Container>

    </Box>
  );
}
