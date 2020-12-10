import bg from '../Styles/Backgrounds/bg4.svg';

const styles = {
   root: {
      width: '400px',
      height: '500px',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid black',
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
   },
   formHeader: {
      padding: '5px',
      background: 'dodgerblue',
      fontSize: '1.4em',
      color: '#fff',
   },
   formContainer: {
      flexGrow: '1',
      padding: '10px',
      margin: 'auto 10px',
      boxSizing: 'border-box',
   },
   roomsSelect: {
      paddingTop: '15px',
      width: '100%',
   },
   toggleShowPwdBtn: {
      cursor: 'pointer',
   },
   formFooter: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#3f51b5',
      padding: '5px 10px',
      justifyContent: 'center',
      alignItems: 'center',
   },
   stylesBack: {
      backgroundColor: '#1462aa',
      backgroundImage: `url(${bg})`,
      width: '100%',
      height: '100vh',
   },
};

export default styles;
