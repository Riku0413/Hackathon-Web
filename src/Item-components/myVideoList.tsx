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
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

import { httpVideoDelete } from '../http-components/http_video_delete';


interface VideoData {
  id: string;
  title: string;
  introduction: string;
  url: string;
  user_id: string;
  birth_time: string;
  update_time: string;
  publish: boolean;
}

export default function MyVideoList() {
  const {user, loading} = useAuth();
  const [videos, setVideos] = useState<VideoData[]>();

  useEffect(() => {
    const fetchData = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          httpFetcher(`http://localhost:8080/videos/draft/${user.uid}`)
          .then(result => {
            setVideos(result);
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
    
    console.log("these are videos!")
    console.log(videos)

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

  const handleDeleteClick = async (video_id: string) => {
    await httpVideoDelete(video_id)
    if (user) {
      httpFetcher(`http://localhost:8080/videos/draft/${user.uid}`)
      .then(result => {
        setVideos(result);
        console.log(result);
      });
    }
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
          {videos && videos.length > 0 ? (
            <div style={{ display: 'flex' }}>
              {videos.map((video, index) => (
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
                      {video.title? video.title : "no title"}
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

                      <Link to={`/makeVideo/${video.id}`} > {/* リンクにスタイルを適用 */}
                        <Fab color="default" aria-label="edit" size="small">
                          <EditIcon />
                        </Fab>
                      </Link>
                      
                      <Fab color="default" aria-label="edit" size="small" sx={{ml: "10px"}} onClick={() => handleDeleteClick(video.id)}>
                        <DeleteIcon />
                      </Fab>
                      
                    </div>

                  </Paper>

                </div>
                
              ))}
            </div>
          ) : (
            <p>No videos available</p>
          )}
        </div>
        
      </Box>
      
    </Container>
  );
}
