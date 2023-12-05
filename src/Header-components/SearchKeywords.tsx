import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Container from '@mui/material/Container';

import Footer from './Footer';

const keywords = ['エディタ', 'OSコマンド', 'Git', 'GitHub', 'HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'SQL', 'Docker', 'Go', 'HTTP', 'RDBMS', 'Unit Test', 'CI', 'CD', '認証'];

const SearchKeywords: React.FC = () => {
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get('q');
  const navigate = useNavigate();
  const [renderComplete, setRenderComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderComplete(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (qParam || !renderComplete) {
    return null;
  }

  const handlePaperClick = (keyword: string): void => {
    console.log(keyword);
    navigate(`/search?q=${keyword}`);
  };

  return (
    <Box>
      <div style={{ marginTop: '200px' }}></div>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          {keywords.map((keyword, index) => (
            <Grid item xs={3} key={index}>
              <Paper
                style={{
                  height: 100,
                  textAlign: 'center',
                  padding: 16,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => handlePaperClick(keyword)}
              >
                <Typography variant="body1" fontWeight="bold" style={{ textAlign: 'center' }}>
                  {keyword}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer></Footer>
    </Box>
  );
};

export default SearchKeywords;
