import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

// import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const keywords = ['エディタ', 'OSコマンド', 'Git', 'GitHub', 'HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'SQL', 'Docker', 'Go', 'HTTP', 'RDBMS', 'Unit Test', 'CI', 'CD', '認証'];

const SearchKeywords: React.FC = () => {
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get('q');
  const navigate = useNavigate();

  if (qParam) {
    // qパラメータが存在する場合、コンポーネントを非表示にする
    return null;
  }

  const handlePaperClick = (keyword: string): void => {
    console.log(keyword);
    navigate(`/search?q=${keyword}`);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {keywords.map((keyword, index) => (
        <Grid item xs={3} key={index} >
          <Paper
            style={{ height: 100, textAlign: 'center', padding: 16, cursor: 'pointer' }}
            onClick={() => handlePaperClick(keyword)}
          >
            {/* {keyword} */}
            <Typography variant="body1" fontWeight="bold">
              {keyword}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchKeywords;

