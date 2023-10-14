import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';

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

export default function LogOut() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  const logout = async () => {
    // firebaseの関数によりログアウト
    await signOut(auth);
    navigate('/');
  }

  return (
    <div>
      <Button variant='outlined' onClick={handleOpen} color='inherit' sx={{mr: 1, color: '#555555', whiteSpace: 'nowrap'}}>sign out</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
            本当にサインアウトしますか？
          </Typography>
          <Box sx={buttonContainerStyle}>
            <Button variant='outlined' onClick={logout} sx={{ flex: 1, mr: 1 }}>はい</Button>
            <Button variant='outlined' onClick={handleClose} sx={{ flex: 1, ml: 1 }}>いいえ</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}