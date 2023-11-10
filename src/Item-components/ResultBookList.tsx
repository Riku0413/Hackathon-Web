import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useEffect, useState} from 'react';
import { httpFetcher } from '../http-components/http_fetcher';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';


interface BookData {
  id: string;
  title: string;
  user_id: string;
  birth_time: string;
  update_time: string;
  publish: boolean;
  introduciton: string
}

export default function ResultBookList() {
  const [books, setBooks] = useState<BookData[]>();

  const [searchParams] = useSearchParams();
  const qParam = searchParams.get('q');

  useEffect(() => {
    if (qParam) {
      httpFetcher(`http://localhost:8080/books/search?q=${qParam}`)
      .then(result => {
        setBooks(result);
        console.log(result);
      });
    }
    
    console.log("these are books!")
    console.log(books)

  }, []);

  return (
    <Container
    //  sx={{bgcolor: "gray"}}
    >
      <div style={{ marginTop: "20px" }}></div>

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto', // 横方向のスクロールを有効にする
          whiteSpace: 'nowrap', // 横並びの要素が折り返さないようにする
          // bgcolor: "gray"
        }}
      >

        <div>
          {books && books.length > 0 ? (
            <div style={{ display: 'flex' }}>
              {books.map((book, index) => (
                <div key={index}>
                  <Link to={`/book/detail/${book.id}`}>
                    <Paper
                      sx={{
                        display: 'inline-block',
                        margin: '8px',
                        minWidth: '200px',
                        height: '200px',
                        position: 'relative',
                      }}
                      elevation={3}
                    >
                      {/* タイトルを中央に配置 */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                          textAlign: 'center',
                        }}
                      >
                        {book.title ? book.title : "no title"}
                      </div>

                      {/* 更新時間を左下に配置 */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          padding: '8px',
                          background: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {book.update_time.split(" ")[0]}
                      </div>

                      {/* ボタンを右下に配置 */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          padding: '8px',
                        }}
                      >
                      
                      </div>
                    </Paper>
                  </Link>
                </div>
                
              ))}
            </div>
          ) : (
            <p>No blogs available</p>
          )}
        </div>
        
      </Box>
      
    </Container>
  );
}
