import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'remarkable';
import $ from 'jquery';

// ReactDOM.render(
//   <h1>Hello, World</h1>,  
//   document.getElementById('app')
// );

const data = [
  {id: 1, author: "Pete Hunt", text: "This is a comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
]

class Comment extends Component {
  rawMarkup() {
      let md = new Remarkable();
      let rawMarkup = md.render(this.props.children.toString());
      return { __html: rawMarkup };
  }
  render() {
    return (
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      );
  }
}


class CommentList extends Component {
  render() {
    let commentNodes = this.props.data.map(function(comment){
      return (
          <Comment author={comment.author} key={comment.id}>
            {comment.text}
          </Comment>
        );
    });
    return (
        <div className="commentList">
          {commentNodes}
        </div>
      )
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.init();      //init() = initialization function : just convention to avoid constructor pollution
  }
 
  init(){
    this.state = {author: '', text: ''}; //ES6 way to getInitialState() = set state in constructor
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value})
  }

  handleTextChange(e) {
    this.setState({text: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.author.trim();
    if(!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author:'', text: ''});
  }

  render() {
    return (
      <div> 
          <form className="commentForm" onSubmit={(e)=>this.handleSubmit(e)}>
            <input type="text" placeholder="Your name" onChange={(e)=>this.handleAuthorChange(e)}/>
            <input type="text" placeholder="Say something..." onChange={ (e)=>this.handleTextChange(e)} />
            <input type="submit" value="Post" />
          </form>
      </div>
    );
  }
}


class CommentBox extends Component {
  
  constructor(props) {
    super(props);
    this.init();      //init() = initialization function : just convention to avoid constructor pollution
  }
 
  init(){
    this.state = {data: []}; //ES6 way to getInitialState() = set state in constructor
  }


  loadCommentsFromServer() {
      $.ajax({
        url       : this.props.url,
        dataType  : 'json',
        cache     : false,
        success   : (data)=>{
          this.setState({data: data});
        }, //no more need to bind(this) this since ES6 arrow function
        error     : (xhr, status, err)=>{
          console.error(this.props.url, status, err.toString());
        } //no more need to bind(this) this since ES6 arrow function 
      });
    }

  handleCommentSubmit(comment) {
    let comments = this.state.data;

    comment.id = Date.now();

    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dateTupe: 'json',
      type: 'POST',
      data: comment,
      success: (data) => {
        this.setState({data:data})
      },
      error: (xhr, status, err)=>{
        this.setState({data: comments})
       console(this.props.url, status, err.toString());
      }

    })


  }
  
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(()=>this.loadCommentsFromServer(), 2000);
  }
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentForm onCommentSubmit={(comment)=>this.handleCommentSubmit(comment)}/>
        <CommentList data={this.state.data} />
      </div>
      );
  }
}


ReactDOM.render(
  <CommentBox url="http://localhost:3000/comments/" pollInterval={100}/>,
  document.getElementById('app')
);