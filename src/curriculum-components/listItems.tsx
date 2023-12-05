import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link as RouterLink } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      First
    </ListSubheader>
    <ListItemButton component={RouterLink} to="/curriculum/webApp">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Web App Deep Dive" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/theHistory">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="The History of Web" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Hackathon
    </ListSubheader>
    <ListItemButton component={RouterLink} to="/curriculum/ide">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="エディタ（IDE）" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/os">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="OSコマンド（とシェル）" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/git">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Git" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/gitHub">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="GitHub" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/htmlCss">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="HTML & CSS" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/javaScript">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="JavaScript" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/react">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="React" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/typeScript">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="React × TypeScript" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/sql">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="SQL" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/docker">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Docker" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/go">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Go" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/httpServer">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="HTTP Server (Go)" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/rdbms">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="RDBMSへ接続 (Go)" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/unitTest">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Unit Test (Go)" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/feBe">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="フロントエンドとバックエンドの接続" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/ci">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="CI" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/cd">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="CD" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/curriculum/auth">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="認証" />
    </ListItemButton>
  </React.Fragment>
);