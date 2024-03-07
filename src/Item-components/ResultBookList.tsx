import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { httpFetcher } from '../http-components/http_fetcher';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

interface BookData {
  id: string;
  title: string;
  birth_time: string;
  update_time: string;
}

// ソートオーダーを定義
type SortOrder = 'asc' | 'desc';

export default function ResultBookList() {
  const [books, setBooks] = useState<BookData[]>([]);
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get('q');
  const [sortCriteria, setSortCriteria] = useState<keyof BookData>('birth_time');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [fetchSuccess, setFetchSuccess] = useState(true); // フェッチ成功のフラグ
  const [isLoading, setIsLoading] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width:700px)');

  useEffect(() => {
    const fetchData = async () => {
      if (qParam) {
        try {
          const result = await httpFetcher(`http://localhost:8080/books/search?q=${qParam}`);
          setBooks(result);
          setIsLoading(false); // データ取得完了後にローディング状態を終了
          setFetchSuccess(true); // データ取得成功時にフラグをtrueに設定
          console.log(result);
        } catch (error) {
          console.error("Error fetching books:", error);
          setFetchSuccess(false); // データ取得失敗時にフラグをfalseに設定
        }
      }
      console.log("these are books!")
      console.log(books)
      setIsLoading(false); // エラー発生時もローディング状態を終了
    };
    fetchData();
  }, [qParam]);

  // ソートされたブログの配列を作成
  const sortedBooks = [...books].sort((a, b) => {
    // 選択された基準と順序に基づいて比較
    if (sortOrder === 'asc') {
      return a[sortCriteria] > b[sortCriteria] ? 1 : -1;
    } else {
      return a[sortCriteria] < b[sortCriteria] ? 1 : -1;
    }
  });

  return (
    <Box sx={{bgcolor: "#FDF5E6"}}>
      
      {/* バーの分だけ下げる */}
      <div style={{ height: "50px", backgroundColor: "#FDF5E6" }}></div>
      
      <Container>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: isSmallScreen || !books.length? 'center' : 'flex-start',
          }}
        >
          {sortedBooks && sortedBooks.length > 0 ? (
            sortedBooks.map((book, index) => (
              <Link
                key={index}
                to={`/book/detail/${book.id}`}
                style={{ 
                  textDecoration: 'none', 
                  flex: '0 0 calc(50% - 10px)', 
                  minWidth: isSmallScreen ? '100%' : '275px', // Optional: Set a minimum width for larger screens
                }}
              >
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      this is book
                    </Typography>
                    <Typography variant="h5" component="div">
                      {book.title ? book.title : "no title"}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      user name
                    </Typography>
                    <Typography variant="body2">
                      {book.update_time.split(" ")[0]}
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
                        <div>Failed to get books</div>
                      ) : (
                        <div>No books available</div>
                      )}
                    </div>
              )}
            </Typography>
          </Box>
          )}
        </Box>

        <div style={{height: "50px"}}></div>
        
      </Container>

    </Box>
  );
}
