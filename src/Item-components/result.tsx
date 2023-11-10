import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { httpFetcher } from '../http-components/http_fetcher';
import { useSearchParams } from 'react-router-dom';
import ResultBlogList from './ResultBlogList';
import ResultBookList from './ResultBookList';
import ResultVideoList from './ResultVideoList';

import { Link } from 'react-router-dom';


interface BlogData {
  id: string;
  title: string;
  content: string;
  user_id: string;
  birth_time: string;
  update_time: string;
  publish: boolean;
}

export default function Result() {
  const location = useLocation();
  const [blogs, setBlogs] = useState<BlogData[]>();
  const [key, setKey] = useState<String | null>('');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('blog');

  const [searchParams] = useSearchParams();
  const qParam = searchParams.get('q');
  const itemParam = searchParams.get('item');

  useEffect(() => {
    console.log(qParam)
    console.log(itemParam)

    if (!itemParam || itemParam === 'blog') {
      setActiveTab('blog');  
    } else {
      setActiveTab(itemParam);  
    }

    // if (qParam) {
    //   // GETリクエストはパスで取得したいデータを指定
    //   httpFetcher(`http://localhost:8080/blogs/search?q=${qParam}`)
    //   .then(result => {
    //     setBlogs(result);
    //     console.log("here");
    //     console.log(result);
    //   });
    // }
  
  }, [qParam, itemParam]);

  if (!qParam) {
    return null
  }

  const handleTabChange = async (tab: string) => {
    await setActiveTab(tab);
    // タブがクリックされたときにリンクに遷移
    navigate(`/search?q=${qParam}&item=${tab}`)
  };

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>

      {/* 本当はこんな感じで、コンポーネントごとに上の余白を定義するべきなんだけど後回し！ */}
      {/* <div style={{ marginTop: "100px" }}></div> */}

      <Container
        // sx={{backgroundColor: 'green'}}
      >

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
          {activeTab === 'blog' && <ResultBlogList />}
          {activeTab === 'book' && <ResultBookList />}
          {activeTab === 'video' && <ResultVideoList />}
          
        </Box>

      </Container>

    </Box>


    </div>
  );
}
