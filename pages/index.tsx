import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Tabs, Tab, Typography, Box, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import ArticleList from './articalesList';
import CreateNewArticle from './createNewArticle';
import {getArticles} from '../actions';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '2%',
    '& .MuiBox-root-63': {
      paddingLeft: '0',
      paddingRight: '0',
    },
    '& .MuiButton-root': {
      width: '400px',
      fontSize: '23px',
      fontWeight: 'Regular',
      marginTop: '15px',
      textTransform: 'unset',
      backgroundColor: '#072C50',
      color: '#fff',
    },
    '& .MuiTabs-root': {
      width: 'max-content',
      margin: 'auto',
    },
    '& .MuiTab-wrapper': {
      fontWeight: 'bold',
      color: '#072C50',
    },
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [articleList, setArticleList] = React.useState([]);
  const [error, setError] = React.useState({isError: false, message: ''});

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const fetchArticles = async () => {
    setLoading(true);
    const res = await getArticles();
    if (res && res.res && res.res.data) {
      setArticleList(res.res.data);
    } else {
      setError({isError: true, message: 'Something went wrong'});
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [value]);

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    setError({isError: false, message: ''});
  };

  function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <div className={classes.root}>
      <Snackbar
        open={error.isError}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error.message || ''}
        </Alert>
      </Snackbar>
      <div className="form_container">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example">
          <Tab label="Articles List" {...a11yProps(0)} />
          <Tab label="Create Article" {...a11yProps(1)} />
        </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <ArticleList articleList={articleList} loading={loading} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateNewArticle setValue={setValue} setAlert={setError} />
      </TabPanel>
    </div>
  );
};

export default Home;
