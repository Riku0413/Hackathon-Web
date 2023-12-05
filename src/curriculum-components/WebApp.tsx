import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function WebApp() {
  return (
    <React.Fragment>
      {/* <Title>Web App Deep Dive</Title> */}
      <Typography component="p" variant="h4">
        Web App Deep Dive
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        (2 hours)
      </Typography>
      <Typography color="black" sx={{ flex: 1 }}>
      　このドキュメントではWebとは何か、Webアプリケーションとは何かについて説明します。Webアプリケーションとその開発について、「大きな地図を手に入れる」ことを目的とします。
      </Typography>
    </React.Fragment>
  );
}