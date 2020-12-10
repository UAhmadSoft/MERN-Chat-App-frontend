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
      boxSizing: 'border-box',
   },
   formHeader: {
      padding: '5px',
      background: 'dodgerblue',
      fontSize: '1.4em',
      color: '#fff',
   },
   formContainer: {
      width: '100%',
      flexGrow: '1',
      padding: '10px',
      marginLeft: '10px',
   },
   roomsSelect: {
      paddingTop: '15px',
      width: '100%',
   },
   toggleShowPwdBtn: {
      cursor: 'pointer',
   },
   formFooter: {},
};

export default styles;
