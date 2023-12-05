import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useEffect, useState, ChangeEvent } from 'react';
import { httpFetcher } from '../http-components/http_fetcher';
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';
import Footer from '../Header-components/Footer';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

interface BlogData {
  id: string;
  title: string;
  birth_time: string;
  update_time: string;
}

interface BookData {
  id: string;
  title: string;
  birth_time: string;
  update_time: string;
}

interface VideoData {
  id: string;
  title: string;
  birth_time: string;
  update_time: string;
}

interface WorkData {
  id: string;
  title: string;
  birth_time: string;
  update_time: string;
}

// ソートオーダーを定義
type SortOrder = 'asc' | 'desc';

export default function Trend() {
  const [blogs, setBlogs] = useState<BlogData[]>();
  const [sortCriteria, setSortCriteria] = useState<keyof BlogData>('birth_time');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const [books, setBooks] = useState<BookData[]>();
  const [sortCriteria2, setSortCriteria2] = useState<keyof BookData>('birth_time');
  const [sortOrder2, setSortOrder2] = useState<SortOrder>('desc');

  const [videos, setVideos] = useState<VideoData[]>();
  const [sortCriteria3, setSortCriteria3] = useState<keyof VideoData>('birth_time');
  const [sortOrder3, setSortOrder3] = useState<SortOrder>('desc');

  const [works, setWorks] = useState<WorkData[]>();
  const [sortCriteria4, setSortCriteria4] = useState<keyof WorkData>('birth_time');
  const [sortOrder4, setSortOrder4] = useState<SortOrder>('desc');

  useEffect(() => {
    const fetchData = async () => {
      
        try {
          const result = await httpFetcher("http://localhost:8080/blogs/all");
          setBlogs(result);
          console.log(result);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }

        try {
          const result = await httpFetcher("http://localhost:8080/books/all");
          setBooks(result);
          console.log(result);
        } catch (error) {
          console.error("Error fetching books:", error);
        }

        try {
          const result = await httpFetcher("http://localhost:8080/videos/all");
          setVideos(result);
          console.log(result);
        } catch (error) {
          console.error("Error fetching books:", error);
        }

        try {
          const result = await httpFetcher("http://localhost:8080/works/all");
          setWorks(result);
          console.log(result);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
    };
    fetchData();
  }, []);

  if (!blogs || !books || !videos || !works) {
    return <p>Loading...</p>;
  }

    // ソートされたブログの配列を作成
    const sortedBlogs = [...blogs].sort((a, b) => {
      // 選択された基準と順序に基づいて比較
      if (sortOrder === 'asc') {
        return a[sortCriteria] > b[sortCriteria] ? 1 : -1;
      } else {
        return a[sortCriteria] < b[sortCriteria] ? 1 : -1;
      }
    });

    // ソートされたブログの配列を作成
    const sortedBooks = [...books].sort((a, b) => {
      // 選択された基準と順序に基づいて比較
      if (sortOrder2 === 'asc') {
        return a[sortCriteria2] > b[sortCriteria2] ? 1 : -1;
      } else {
        return a[sortCriteria2] < b[sortCriteria2] ? 1 : -1;
      }
    });
  
    // ソートされたブログの配列を作成
    const sortedVideos = [...videos].sort((a, b) => {
      // 選択された基準と順序に基づいて比較
      if (sortOrder3 === 'asc') {
        return a[sortCriteria3] > b[sortCriteria3] ? 1 : -1;
      } else {
        return a[sortCriteria3] < b[sortCriteria3] ? 1 : -1;
      }
    });

    // ソートされたブログの配列を作成
    const sortedWorks = [...works].sort((a, b) => {
      // 選択された基準と順序に基づいて比較
      if (sortOrder4 === 'asc') {
        return a[sortCriteria4] > b[sortCriteria4] ? 1 : -1;
      } else {
        return a[sortCriteria4] < b[sortCriteria4] ? 1 : -1;
      }
    });

    // const handleSortChange = async (event: ChangeEvent<{ value: unknown }>) => {
    //   const selectedValue = event.target.value as keyof BlogData
    //   await setSortCriteria(selectedValue);
    // };
  
    // const handleSwitchChange = async (event: React.ChangeEvent<HTMLInputElement>) => { 
    //   const isChecked = event.target.checked;
    //   if (isChecked) {
    //     await setSortOrder('desc');
    //   } else {
    //     await setSortOrder('asc');
    //   }
    // };

  return (
    <Box>

        {/* バーの分だけ下げる */}
        <div style={{ height: "200px", backgroundColor: "#FDF5E6" }}></div>
        
      <Container
       sx={{backgroundColor: "#FDF5E6"}}
      >
        
                    <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    
                  }}
                >
                  <strong style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Latest Blogs</strong>
                <hr style={{ width: '93%', borderTop: '1px solid #ccc' }} />
                </div>
  {/* 　　　　　<Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            <Switch {...label} defaultChecked onChange={handleSwitchChange} />
            desc
          </Box> */}

        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto', // 横方向のスクロールを有効にする
            whiteSpace: 'nowrap', // 横並びの要素が折り返さないようにする
            // bgcolor: "gray"
          }}
        >

          <div>
            {sortedBlogs && sortedBlogs.length > 0 ? (
              <div style={{ display: 'flex' }}>
                {sortedBlogs.map((blog, index) => (
                  <div key={index}>
                    <Link to={`/blog/detail/${blog.id}`}>
                    <Paper
    sx={{
      display: 'inline-block',
      margin: '8px',
      minWidth: '200px',
      height: '200px',
      position: 'relative',
      // bgcolor: 'lightgray'
    }}
    elevation={3}
  >
    {/* ArticleIconを左上に配置 */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '8px',
        color: 'royalblue',
      }}
    >
      <ArticleIcon />
    </div>

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
      {blog.title ? blog.title : "no title"}
    </div>

    {/* 更新時間を左下に配置 */}
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: '8px',
        // background: 'rgba(255, 255, 255, 0.7)',
        // background: 'lightgray'
      }}
    >
      {blog.update_time.split(" ")[0]}
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




        <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '20px'
                  }}
                >
                  <strong style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Latest Books</strong>
                <hr style={{ width: '93%', borderTop: '1px solid #ccc' }} />
                </div>
  {/* 　　　　　<Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            <Switch {...label} defaultChecked onChange={handleSwitchChange} />
            desc
          </Box> */}

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
                          // bgcolor: 'lightgray'
                        }}
                        elevation={3}
                      >
                          {/* ArticleIconを左上に配置 */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '8px',
        color: 'seagreen',
      }}
    >
      <MenuBookIcon />
    </div>
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
                            // background: 'rgba(255, 255, 255, 0.7)',
                            // background: 'lightgray'
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
        
        <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '20px'
                  }}
                >
                  <strong style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Latest Videos</strong>
                <hr style={{ width: '93%', borderTop: '1px solid #ccc' }} />
                </div>
  {/* 　　　　　<Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            <Switch {...label} defaultChecked onChange={handleSwitchChange} />
            desc
          </Box> */}

        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto', // 横方向のスクロールを有効にする
            whiteSpace: 'nowrap', // 横並びの要素が折り返さないようにする
            // bgcolor: "gray"
          }}
        >

          <div>
            {sortedVideos && sortedVideos.length > 0 ? (
              <div style={{ display: 'flex' }}>
                {sortedVideos.map((video, index) => (
                  <div key={index}>
                    <Link to={`/video/detail/${video.id}`}>
                      <Paper
                        sx={{
                          display: 'inline-block',
                          margin: '8px',
                          minWidth: '200px',
                          height: '200px',
                          position: 'relative',
                          // bgcolor: 'lightgray'
                        }}
                        elevation={3}
                      >

  <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '8px',
        color: 'crimson',
      }}
    >
      <OndemandVideoIcon />
    </div>

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
                          {video.title ? video.title : "no title"}
                        </div>

                        {/* 更新時間を左下に配置 */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            padding: '8px',
                            // background: 'rgba(255, 255, 255, 0.7)',
                            // background: 'lightgray'
                          }}
                        >
                          {video.update_time.split(" ")[0]}
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
              <p>No videos available</p>
            )}
          </div>
          
        </Box>

        <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '20px'
                  }}
                >
                  <strong style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Latest Works</strong>
                <hr style={{ width: '93%', borderTop: '1px solid #ccc' }} />
                </div>
  {/* 　　　　　<Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            <Switch {...label} defaultChecked onChange={handleSwitchChange} />
            desc
          </Box> */}

        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto', // 横方向のスクロールを有効にする
            whiteSpace: 'nowrap', // 横並びの要素が折り返さないようにする
            // bgcolor: "gray"
          }}
        >

          <div>
            {sortedWorks && sortedWorks.length > 0 ? (
              <div style={{ display: 'flex' }}>
                {sortedWorks.map((work, index) => (
                  <div key={index}>
                    <Link to={`/work/detail/${work.id}`}>
                      <Paper
                        sx={{
                          display: 'inline-block',
                          margin: '8px',
                          minWidth: '200px',
                          height: '200px',
                          position: 'relative',
                          // bgcolor: 'lightgray'
                        }}
                        elevation={3}
                      >

  <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '8px',
        color: 'gold',
      }}
    >
      <AppShortcutIcon />
    </div>

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
                          {work.title ? work.title : "no title"}
                        </div>

                        {/* 更新時間を左下に配置 */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            padding: '8px',
                            // background: 'rgba(255, 255, 255, 0.7)',
                            // background: 'lightgray'
                          }}
                        >
                          {work.update_time.split(" ")[0]}
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
              <p>No works available</p>
            )}
          </div>
          
        </Box>

      </Container>

      <Footer></Footer>

    </Box>
  );
}
