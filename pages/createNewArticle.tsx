import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, TextField, FormHelperText} from '@material-ui/core';
import {createNewArticle} from '../actions';

const useStyles = makeStyles(() => ({
  textField: {
    height: '72px',
    width: '400px',
    fontSize: '14px',
  },
  dFlex: {
    display: 'flex',
    flexDirection: 'column',
  },
  validationMessage: {
    color: 'red',
  },
  alignContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const initialState = {
  title: '',
  intro: '',
  email: '',
  publicationDate: '',
};

interface CreateNewArticleProps {
  setValue: (value: number) => void;
  setAlert: (value: any) => void;
}

const CreateNewArticle: React.FC<CreateNewArticleProps> = ({
  setValue,
  setAlert,
}) => {
  const classes = useStyles();
  const [errors, setError] = useState(initialState);
  const [createDetail, setCreateDetails] = useState(initialState);

  const handleCreateChange = (e: any) => {
    const {name, value} = e.target;
    setCreateDetails({...createDetail, [name]: value});
  };

  const validation = (name: string, value: string) => {
    switch (name) {
      case 'title':
        if (!value) {
          return 'Please Enter Title!!';
        } else {
          return null;
        }
      case 'intro':
        if (!value) {
          return 'Please Enter Intro!!';
        } else if (value.length > 255) {
          return 'Allow max 255 char';
        } else {
          return null;
        }
      case 'email':
        if (!value) {
          return 'Please Enter email!!';
        } else if (
          !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return 'Enter valid email';
        } else {
          return null;
        }
      case 'publicationDate':
        if (!value) {
          return 'Please Select publicationDate!!';
        } else {
          return null;
        }
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    let allErrors: any = {};
    Object.keys(createDetail).forEach((key) => {
      // @ts-ignore
      const error = validation(key, createDetail[key]);
      if (error && error.length) {
        allErrors[key] = error;
      }
    });
    if (Object.keys(allErrors).length) {
      setError(allErrors);
    } else {
      const res = await createNewArticle(createDetail);
      if (res && res.res && res.res.data) {
        setError(initialState);
        setValue(0);
      } else {
        setAlert({isError: true, message: 'Something went wrong'});
      }
    }
  };

  return (
    <div className={classes.alignContent}>
      <div className={classes.dFlex}>
        <TextField
          id="outlined-margin-normal"
          className={classes.textField}
          name="title"
          value={createDetail.title}
          onChange={handleCreateChange}
          placeholder="Title *"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <FormHelperText className={classes.validationMessage}>
          {errors.title}
        </FormHelperText>
      </div>
      <div className={classes.dFlex}>
        <TextField
          id="outlined-margin-normal"
          className={classes.textField}
          name="intro"
          value={createDetail.intro}
          onChange={handleCreateChange}
          placeholder="Intro *"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <FormHelperText className={classes.validationMessage}>
          {errors.intro}
        </FormHelperText>
      </div>
      <div className={classes.dFlex}>
        <TextField
          id="outlined-margin-normal"
          className={classes.textField}
          name="email"
          value={createDetail.email}
          onChange={handleCreateChange}
          placeholder="Email *"
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <FormHelperText className={classes.validationMessage}>
          {errors.email}
        </FormHelperText>
      </div>
      <div className={classes.dFlex}>
        <TextField
          id="date"
          label="Publication Date"
          className={classes.textField}
          type="date"
          name="publicationDate"
          margin="normal"
          variant="outlined"
          onChange={handleCreateChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormHelperText className={classes.validationMessage}>
          {errors.publicationDate}
        </FormHelperText>
      </div>
      <div>
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateNewArticle;
