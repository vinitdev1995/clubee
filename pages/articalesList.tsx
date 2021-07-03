import React from 'react';
import {makeStyles, Grid} from '@material-ui/core';
import {DataGrid, GridColDef} from '@material-ui/data-grid';
import moment from 'moment';

const useStyles = makeStyles({
  root: {
    borderTop: 0,
    borderRight: 0,
    borderBottom: 0,
    borderLeft: 0,
    textAlign: 'center',
  },
  tableheading: {
    display: 'inline-grid',
  },
  heading: {
    color: '#072C50',
  },
});

interface ArticleListProps {
  articleList: any;
  loading: boolean;
}

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Title',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'intro',
    headerName: 'Intro',
    align: 'center',
    headerAlign: 'center',
  },
  {
    flex: 1,
    field: 'email',
    headerName: 'Email',
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'publicationDate',
    headerName: 'PublicationDate',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
];

const ArticleList: React.FC<ArticleListProps> = ({articleList, loading}) => {
  const classes = useStyles();

  const rows = (articleList || []).map((data: any, index: number) => ({
    id: index,
    title: data?.title || '',
    intro: data?.intro || '',
    email: data?.email || '',
    publicationDate: moment(data?.publicationDate).format('MM/DD/YYYY') || '',
  }));

  return (
    <section>
      <Grid item xs={12}>
        <h1 className={classes.heading}>Last Five Articles</h1>
      </Grid>
      <DataGrid
        loading={loading}
        columns={columns}
        rows={rows}
        classes={{
          root: classes.root,
        }}
        autoHeight
        disableColumnFilter
        showColumnRightBorder={false}
        disableColumnMenu
      />
    </section>
  );
};
export default ArticleList;
