import React from 'react';
import { withAuthorization } from '../Session';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      keys: [],
      startNextKey: '',
      topKeys: [],
    }
    this.pageSize = 2;
  }
  async componentDidMount() {
    const snapshot = await this.props.firebase.books()
      .orderByChild('title')
      .limitToFirst(this.pageSize+1)
      .startAt('')
      .once('value');
    const values = snapshot.val();
    const keys = Object.keys(values);
    this.setState({
      books: Object.values(values).slice(0, this.pageSize),
      keys: keys.slice(0, this.pageSize),
      startNextKey: keys[this.pageSize] ? values[keys[this.pageSize]].title : '',
      topKeys: []
    })
  }
  add = async () => {
    // this.props.firebase.books().push({title: 'book5', author: 'S.A. Joseph'})
  }
  prev = async () => {
    console.log('prev',this.state, this.state.topKeys[this.state.topKeys.length-1])
    const snapshot = await this.props.firebase.books()
      .orderByChild('title')
      .limitToFirst(this.pageSize+1)
      .startAt(this.state.topKeys[this.state.topKeys.length-1])
      .once('value');
    const values = snapshot.val();
    const keys = Object.keys(values);
    //console.log('--keys', keys)
    this.setState({
      books: Object.values(values).slice(0, this.pageSize),
      keys: keys.slice(0, this.pageSize),
      startNextKey: values[keys[keys.length-1]].title,
      topKeys: this.state.topKeys.slice(0, this.state.topKeys.length-1)
    })
  }
  next = async () => {
    console.log('next', this.state)
    const snapshot = await this.props.firebase.books()
      .orderByChild('title')
      .limitToFirst(this.pageSize+1)
      .startAt(this.state.startNextKey)
      .once('value')
    const values = snapshot.val();
    const keys = Object.keys(values);
    this.setState({
      books: Object.values(values).slice(0, this.pageSize),
      keys: keys.slice(0, this.pageSize),
      startNextKey: keys[this.pageSize] ? values[keys[this.pageSize]].title : '',
      topKeys: this.state.topKeys.concat(this.state.keys[0])
    })
  }

  render() {
    const books = this.state.books.map((x,i) => {
      return (<li key={this.state.keys[i]}><span>{x.author}</span> <span>{x.title}</span></li>);
    });
    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <ul>
          {books}
        </ul>
        {this.state.topKeys.length > 0 && <button onClick={this.prev}>Prev</button>}
        {this.state.startNextKey && <button onClick={this.next}>Next</button>}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
