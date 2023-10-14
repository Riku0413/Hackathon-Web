import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Result() {
  return (
    <Container>
      Results 1
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto', // 横方向のスクロールを有効にする
          whiteSpace: 'nowrap', // 横並びの要素が折り返さないようにする
        }}
      >
        {/* Paper コンポーネントを横一列に並べる */}
        <Paper
          sx={{
            display: 'inline-block',
            margin: '8px', // ペーパー間の間隔
            minWidth: '200px', // ペーパーの最小幅
            height: '200px', // ペーパーの高さ
          }}
          elevation={3} // 影の設定
        >
          1枚目
        </Paper>
        <Paper
          sx={{
            display: 'inline-block',
            margin: '8px',
            minWidth: '200px',
            height: '200px',
          }}
          elevation={3}
        >
          2枚目
        </Paper>
        <Paper
          sx={{
            display: 'inline-block',
            margin: '8px',
            minWidth: '200px',
            height: '200px',
          }}
          elevation={3}
        >
          3枚目
        </Paper>
        <Paper
          sx={{
            display: 'inline-block',
            margin: '8px',
            minWidth: '200px',
            height: '200px',
          }}
          elevation={3}
        >
          4枚目
        </Paper>
      </Box>

      Results 2
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto', // 横方向のスクロールを有効にする
          whiteSpace: 'nowrap', // 横並びの要素が折り返さないようにする
        }}
      >
        {/* Paper コンポーネントを横一列に並べる */}
        <Paper
          sx={{
            display: 'inline-block',
            margin: '8px', // ペーパー間の間隔
            minWidth: '200px', // ペーパーの最小幅
            height: '200px', // ペーパーの高さ
          }}
          elevation={3} // 影の設定
        >
          1枚目
        </Paper>
        <Paper
          sx={{
            display: 'inline-block',
            margin: '8px',
            minWidth: '200px',
            height: '200px',
          }}
          elevation={3}
        >
          2枚目
        </Paper>
        <Paper
          sx={{
            display: 'inline-block',
            margin: '8px',
            minWidth: '200px',
            height: '200px',
          }}
          elevation={3}
        >
          3枚目
        </Paper>
        <Paper
          sx={{
            display: 'inline-block',
            margin: '8px',
            minWidth: '200px',
            height: '200px',
          }}
          elevation={3}
        >
          4枚目
        </Paper>
      </Box>

    </Container>
  );
}
