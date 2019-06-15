import React from 'react';
import { withAuthorization } from '../Session';
import { Paper, Typography, Button, List, ListItem, ListItemText } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    margin: 20,
    padding: 20,
    maxWidth: 400
  }
}

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      keys: [],
      nextKey: '',
      prevKeys: [],
    }
    this.pageSize = 2;
  }
  async componentDidMount() {
    // this.props.store.dispatch({type: 'GET_BOOKS'})
    const snapshot = await this.props.firebase.books()
      .orderByKey()
      .limitToFirst(this.pageSize+1)
      .startAt('')
      .once('value');
    const values = snapshot.val();
    const keys = Object.keys(values);
    this.setState({
      books: Object.values(values).slice(0, this.pageSize),
      keys: keys.slice(0, this.pageSize),
      nextKey: keys[this.pageSize],
      prevKeys: []
    })
  }
  add = async () => {
    this.props.store.dispatch({type:'GET_BOOKS'})
    // const bookNum = Math.round(Math.random()*1000);
    // this.props.firebase.books().push({title: `book${bookNum}`, author: 'S.A. Joseph'})
  }
  prev = async () => {
    const snapshot = await this.props.firebase.books()
      .orderByKey()
      .limitToFirst(this.pageSize+1)
      .startAt(this.state.prevKeys[this.state.prevKeys.length-1])
      .once('value');
    const values = snapshot.val();
    const keys = Object.keys(values);
    this.setState({
      books: Object.values(values).slice(0, this.pageSize),
      keys: keys.slice(0, this.pageSize),
      nextKey: keys[keys.length-1],
      prevKeys: this.state.prevKeys.slice(0, this.state.prevKeys.length-1)
    });
  }
  next = async () => {
    const snapshot = await this.props.firebase.books()
      .orderByKey()
      .limitToFirst(this.pageSize+1)
      .startAt(this.state.nextKey)
      .once('value');
    const values = snapshot.val();
    const keys = Object.keys(values);
    const prevKey = this.state.keys[0];
    this.setState({
      books: Object.values(values).slice(0, this.pageSize),
      keys: keys.slice(0, this.pageSize),
      nextKey: keys[this.pageSize],
      prevKeys: this.state.prevKeys.concat(prevKey)
    })
  }

  render() {
    const {classes} = this.props;
    const books = this.state.books.map((x,i) => {
      return (
        <ListItem key={this.state.keys[i]}>
          <ListItemText primary={x.author}/>
          <ListItemText primary={x.title}/>
        </ListItem>
      );
    });
    return (
      <Paper className={classes.root}>
        <Typography variant='title' align='center' gutterBottom>
          Home Page
        </Typography>
        <p>The Home Page is accessible by every signed in user.</p>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          onClick={this.add}
        >
          Add Book
        </Button>
        <List>
          {books}
        </List>
        {<PrimaryButton disabled={this.state.prevKeys.length === 0} onClick={this.prev} text="Prev" color='secondary'/>}
        {<PrimaryButton disabled={!this.state.nextKey} onClick={this.next} text="Next" color='secondary' />}
      </Paper>
    );
  }
}

const PrimaryButton = (props) => <Button color='primary' variant='contained' {...props}>{props.text}</Button>

const condition = authUser => !!authUser;

export default withStyles(styles)(withAuthorization(condition)(HomePage));
