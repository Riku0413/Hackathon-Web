import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useEffect, useState, ChangeEvent } from 'react';
import { httpFetcher } from '../http-components/http_fetcher';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

interface BookData {
  id: string;
  title: string;
  birth_time: string;
  update_time: string;
}

// ソートオーダーを定義
type SortOrder = 'asc' | 'desc';

export default function ResultBookList() {
  const [books, setBlogs] = useState<BookData[]>();
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get('q');
  const [sortCriteria, setSortCriteria] = useState<keyof BookData>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    const fetchData = async () => {
      if (qParam) {
        try {
          const result = await httpFetcher(`http://localhost:8080/books/search?q=${qParam}`);
          setBlogs(result);
          console.log(result);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      }
      console.log("these are books!")
      console.log(books)
    };
    fetchData();
  }, [qParam]);

  if (!books) {
    return <p>Loading...</p>;
  }

  // ソートされたブログの配列を作成
  const sortedBooks = [...books].sort((a, b) => {
    // 選択された基準と順序に基づいて比較
    if (sortOrder === 'asc') {
      return a[sortCriteria] > b[sortCriteria] ? 1 : -1;
    } else {
      return a[sortCriteria] < b[sortCriteria] ? 1 : -1;
    }
  });

  const handleSortChange = async (event: ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as keyof BookData
    await setSortCriteria(selectedValue);
  };

  const handleSwitchChange = async (event: React.ChangeEvent<HTMLInputElement>) => { 
    const isChecked = event.target.checked;
    if (isChecked) {
      await setSortOrder('desc');
    } else {
      await setSortOrder('asc');
    }
  };

  return (
    <Container
    //  sx={{bgcolor: "gray"}}
    >

　　　　　<Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Sorted by
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: 'age',
                  id: 'uncontrolled-native',
                }}
                onChange={handleSortChange}
              >
                <option value={'title'}>title</option>
                <option value={'birth_time'}>create time</option>
                <option value={'update_time'}>update time</option>
              </NativeSelect>
            </FormControl>
          </Box>
          asc
          <Switch color='warning' {...label} defaultChecked onChange={handleSwitchChange} />
          desc
        </Box>

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto', // 横方向のスクロールを有効にする
          whiteSpace: 'nowrap', // 横並びの要素が折り返さないようにする
          // bgcolor: "gray"
        }}
      >

        <div>
          {sortedBooks && sortedBooks.length > 0 ? (
            <div style={{ display: 'flex' }}>
              {sortedBooks.map((book, index) => (
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
            <p>No books available</p>
          )}
        </div>
        
      </Box>
      
    </Container>
  );
}
