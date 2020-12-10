import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
const appBarHeight = 64;

const useStyles = makeStyles((theme) => ({
   root: {
      display: 'flex',
      flexGrow: 1,
      // maxWidth: 752,
   },
   demo: {
      backgroundColor: '#4cb2f5',
      height: '100%',
   },
   title: {
      margin: theme.spacing(4, 0, 2),
   },
   appBar: {
      height: appBarHeight,
      transition: theme.transitions.create(['margin', 'width'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
   },
   appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen,
      }),
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   hide: {
      display: 'none',
   },
   drawer: {
      width: drawerWidth,
      flexShrink: 0,
   },
   drawerPaper: {
      width: drawerWidth,
   },
   drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'center',
      backgroundColor: 'darkturquoise',
   },
   NavHeading: {
      margin: 'auto',
   },
   content: {
      width: '100%',
      flexGrow: 1,
      height: '100vh',
      padding: '15px',
      transition: theme.transitions.create('margin', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: drawerWidth,
      marginTop: appBarHeight,
   },
   contentShift: {
      transition: theme.transitions.create('margin', {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
   },
   removeIcon: {
      color: 'red',
   },
   message: {
      backgroundColor: (props) => (props.self === true ? '#0095f9' : '#e4e6eb'),
      color: (props) => (props.self === true ? '#fff' : '#050505'),
   },
   sendIcon: {
      marginLeft: 'auto',
      backgroundColor: '#0095f9',
      fontSize: '2em',
      padding: '5px 15px',
      //   marginRight: '0px',
      boxSizing: 'border-box',
      cursor: 'pointer',
      marginRight: '10px',
      '& svg': {
         fontSize: '20px',
      },
   },
   chatField: {
      backgroundColor: '#fff',
      width: '100%',
      // height: '100%',
      margin: 'auto 10px',
      borderRadius: '20px',
      '& input': {
         margin: '0px 10px',
         padding: '10px',
         width: '-webkit-fill-available',
         backgroundColor: 'inherit',
         border: 'none',
         color: 'black',
         '&:focus': {
            outline: 'none',
         },
      },
      messageContainer: {
         display: 'flex',
         justifyContent: 'space-aroud',
      },
   },
}));

export default useStyles;
