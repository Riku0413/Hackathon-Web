import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import HomeAppBar from './HomeAppBar';

const Header = () => {

  return (
    <>
      <HomeAppBar/>

      {/* Appbarの縦幅分下げる！！ */}
      <div style={{ marginTop: '150px' }}></div>
    </>
  );
};

export default Header;