import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useEffect, useState} from 'react';
import useSWR from "swr";
import { httpFetcher } from '../http-components/http_fetcher';
import { useAuth } from '../AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { httpBookDelete } from '../http-components/http_book_delete';


interface BookData {
  id: string;
  user_id: string;
  title: string;
  birth_time: string;
  update_time: string;
  publish: boolean;
  introduction: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300, // 幅を調整
  height: 150, // 高さも同じ値に設定して正方形にする
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  mt: 8,
};

export default function MyBookList() {
  const {user, loading} = useAuth();
  const [books, setBooks] = useState<BookData[]>();
  const [SelectedBookId, setSelectedBookId] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          httpFetcher(`http://localhost:8080/books/draft/${user.uid}`)
          .then(result => {
            setBooks(result);
            console.log(result);
          });
        }
      });
    };

    fetchData(); // データの取得処理を開始

    // GETリクエストの定型文！
    // const { data: blogs, error } = useSWR<BlogData[]>(
    //   `http://localhost:8080/blogs/${user.uid}`,
    //   httpFetcher
    // );
    
    console.log("these are books!")
    console.log(books)

    // ここで改めて、getリクエスト送りたい！
    // GETリクエストの定型文！
    // const { data: blog, error } = useSWR<BlogData[]>(
    //   "http://localhost:8080/blog",
    //   httpFetcher
    // );

    // ここで、パラメータ or パスの末尾 として、blog_idをバックエンドに送る必要がある
    // さらにその送ったblog_idを受け取ってパースする処理をバックエンドに記述する必要がある

    // このcomponentの読み込み＝blogの作成、に同期させて作った作ったblogデータを
    // ここで、取得しているけど、必要ある？
    // httpFetcher(`http://localhost:8080/blog/${lastSegment}`)
    // .then(result => {
    //   setData(result);
    //   // デバック用
    //   console.log(result);
    // });
  
  }, [user, loading]);

  const handleDeleteClick = async (book_id: string) => {
    // ↓このリクエストでchapterもまとめて消す！
    await httpBookDelete(book_id)
    if (user) {
      httpFetcher(`http://localhost:8080/books/draft/${user.uid}`)
      .then(result => {
        setBooks(result);
        console.log(result);
      });
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleOpenDeleteModal = (book_id: string) => {
    setSelectedBookId(book_id);
    handleOpen();
  };  
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
                  
                  <Paper
                    sx={{
                      display: 'inline-block',
                      margin: '8px', // ペーパー間の間隔
                      minWidth: '200px', // ペーパーの最小幅
                      height: '200px', // ペーパーの高さ
                      position: 'relative', // ペーパー内の要素を配置するために親要素を相対位置に設定
                    }}
                    elevation={3} // 影の設定
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
                      {book.title? book.title : "no title"}
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
                      <Link to={`/makeBook/${book.id}`} > {/* リンクにスタイルを適用 */}
                        <Fab color="default" aria-label="edit" size="small">
                          <EditIcon />
                        </Fab>
                      </Link>

                      <Fab color="default" aria-label="edit" size="small" sx={{ml: "10px"}} onClick={() => handleOpenDeleteModal(book.id)}>
                        <DeleteIcon />
                      </Fab>

                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
                          Do you really want to delete?
                          This process is irrevocable.
                          </Typography>
                          <Box sx={buttonContainerStyle}>
                          　<Button variant='outlined' onClick={() => handleDeleteClick(SelectedBookId)} sx={{ flex: 1, mr: 1 }}>Yes</Button>
                          　<Button variant='outlined' onClick={handleClose} sx={{ flex: 1, ml: 1 }}>No</Button>
                          </Box>
                        </Box>
                      </Modal>

                    </div>

                  </Paper>

                </div>
                
              ))}
            </div>
          ) : (
            <p>No books available</p>
          )}
        </div>
        
      </Box>

      <div style={{height: "50px"}}></div>
      
    </Container>
  );
}
