import React, { Component } from 'react'

export class NewsItem extends Component {
  /* this is how constructo is used and this will run as many time we call in the news.js */
  // constructor(){
  //   super();
  //   console.log("this is constructor")
  // }
  render() {
    let { title, description, imgurl, newUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: "84%", zindex:"1" }}>
            {source}
            <span className="visually-hidden">unread messages</span> </span>
          {/*also ! if its true then: used defaul image for those whose image is null in the news api */}
          <img src={!imgurl ? "https://images.indianexpress.com/2022/09/Google-Stadia-1.jpg" : imgurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}..
              <span className="badge bg-secondary rounded-4" >New</span></h5>
            <p className="card-text">{description}..</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem