import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const SearchKeywords: React.FC = () => {
  const handlePaperClick = (index: number): void => {
    console.log(`Paper ${index + 1} clicked`);
    // ここにクリックイベントを追加
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {Array.from({ length: 20 }, (item, index) => (
        <Grid item xs={3} key={index}>
          <Paper
            style={{ height: 100, textAlign: 'center', padding: 16, cursor: 'pointer' }}
            onClick={() => handlePaperClick(index)}
          >
            Keyword {index + 1}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchKeywords;
