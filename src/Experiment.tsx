import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';

function Experiment() {

  return (
    <>
    <Container maxWidth="sm" sx={{bgcolor: "orange"}}>
      <Box sx={{ bgcolor: '#cfe8fc', height: '50vh', width: '50vw' }} />
    </Container>
    <Container fixed maxWidth="lg" sx={{bgcolor: "green"}}>
    <Box component="span" sx={{ p: 2, border: '1px dashed grey' }} ml={2}>
      <Button variant="outlined" sx={{backgroundColor: "lightblue"}}>Save</Button>
    </Box>
    </Container>
    </>
  );
}

export default Experiment;