import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { httpFetcher } from '../http-components/http_fetcher';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from '../Header-components/Footer';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useMediaQuery } from '@mui/material';

interface BlogData {
  id: string;
  title: string;
  birth_time: string;
  update_time: string;
}

// ソートオーダーを定義
type SortOrder = 'asc' | 'desc';

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [sortCriteria, setSortCriteria] = useState<keyof BlogData>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [fetchSuccess, setFetchSuccess] = useState(true); // フェッチ成功のフラグ
  const [isLoading, setIsLoading] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width:700px)');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await httpFetcher("http://localhost:8080/blogs/all");
        setBlogs(result);
        setIsLoading(false); // データ取得完了後にローディング状態を終了
        setFetchSuccess(true); // データ取得成功時にフラグをtrueに設定
        console.log(result);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setIsLoading(false); // エラー発生時もローディング状態を終了
        setFetchSuccess(false); // データ取得失敗時にフラグをfalseに設定
      }
    };

    fetchData();
  }, []);

  // ソートされたブログの配列を作成
  const sortedBlogs = [...blogs].sort((a, b) => {
    // 選択された基準と順序に基づいて比較
    if (sortOrder === 'asc') {
      return a[sortCriteria] > b[sortCriteria] ? 1 : -1;
    } else {
      return a[sortCriteria] < b[sortCriteria] ? 1 : -1;
    }
  });
  
  const handleSortChange = async (selectedValue: string) => {
    await setSortCriteria(selectedValue as keyof BlogData);
    if (selectedValue == 'title') {
      await setSortOrder('asc');
    } else {
      await setSortOrder('desc');
    }
  };
  
  const buttons = [
    { label: "title", value: "title" },
    { label: "create", value: "birth_time" },
    { label: "update", value: "update_time" }
  ].map((buttonData, index) => (
    <Button key={index} onClick={() => handleSortChange(buttonData.value)}>{buttonData.label}</Button>
  ));
    

  return (
    <Box sx={{bgcolor: "#FDF5E6"}}>
      
      {/* バーの分だけ下げる */}
      <div style={{ height: "150px", backgroundColor: "#FDF5E6" }}></div>
      
      <Container>
        
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px' }}>
            <Typography variant="h5" component="div" fontWeight={'bold'} marginLeft={'10px'}>All Blogs</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  '& > *': {
                    m: 1,
                  },
                  fontSize: '0.8rem', // 任意のフォントサイズに設定
                  fontWeight: 'bold',
                }}
              >
                Sort Option
                <ButtonGroup variant="contained" color="warning" aria-label="medium secondary button group">
                  {buttons}
                </ButtonGroup>
              </Box>

            </Box>
          </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: isSmallScreen || !blogs.length? 'center' : 'flex-start',
          }}
        >
          {sortedBlogs && sortedBlogs.length > 0 ? (
            sortedBlogs.map((blog, index) => (
              <Link
                key={index}
                to={`/blog/detail/${blog.id}`}
                style={{ 
                  textDecoration: 'none', 
                  flex: '0 0 calc(50% - 10px)', 
                  minWidth: isSmallScreen ? '100%' : '275px', // Optional: Set a minimum width for larger screens
                }}
              >
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      this is blog
                    </Typography>
                    <Typography variant="h5" component="div">
                      {blog.title ? blog.title : "no title"}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      user name
                    </Typography>
                    <Typography variant="body2">
                      {blog.update_time.split(" ")[0]}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
              height: '600px'
            }}
          >
            <Typography variant="h4" component="p">
              {isLoading ? (
                // <p>Loading...</p>
                null
                  ) : (
                    <div>
                      {!fetchSuccess? (
                        <div>Failed to get blogs</div>
                      ) : (
                        <div>No blogs available</div>
                      )}
                    </div>
              )}
            </Typography>
          </Box>
          )}
        </Box>

        <div style={{height: "50px"}}></div>
        
      </Container>

      <Footer></Footer>

    </Box>
  );
}
