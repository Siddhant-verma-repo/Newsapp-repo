import React, { Component } from 'react'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  // i used artcle arrya with object inside them before using api url directly if u dont reme just see articles.text 
  //after this below all are important
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
      }
  constructor(props) {
    super(props);
    //used pops inside only for passing name in the title
    console.log("hello1")
    this.state = {
      articles: [],
      loading: true,
      // need to give defaul page aur else it wont show next aur preview
      page: 1,
      totalResults: 0,
    }
    //for title in the head body
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Headlines`
  }
  async Update() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log("hello2")
    this.setState({ loading: true })

    let data = await fetch(url);
    this.props.setProgress(40);

    let parsedata = await data.json();
    this.props.setProgress(60);

    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false
    })
    this.props.setProgress(100);

  }
  // we gonna use asyn and await function when fetching api not articles arrya that we given above
  async componentDidMount() {
    this.Update();
  }
  handlNext = async () => {
    console.log("Next page")
    await this.setState({ page: this.state.page + 1 })
    this.Update();
  }
  handlPrevious = async () => {
    console.log("Previous page")
    await this.setState({ page: this.state.page - 1 })
    this.Update();
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4009e42566dc48d2a69a98c6da52decf&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log("hello2")
    this.setState({ loading: true })

    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      //this is most important
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
      loading: false
    })
  };
  render() {
    return (
      // removing this div contaner and putting ghost element
      <>
        <h2 className='text-center' style={{ margin: "31px" }}>Top News - From {this.props.name} Headlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading&&<Spinner/>}
          // loader line important
        >
          <div className="container">


            <div className="row">

              {this.state.articles.map((element,index) => {//this is used to map unique key so all the article arrya should have unique key in div u mistake in newitem
                return <div className="col-md-4" key={index} >
                  {/* given unique id key index in place of elment.url */}
                  {/* to make uniform img show and title and description we use slice */}
                  <NewsItem title={element ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 85) : ""} imgurl={element.urlToImage} newUrl={element.url}
                    author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between"> */}
        {/* because we are in the class */}
        {/* <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlPrevious}>&larr; Previous Page</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / (this.props.pageSize))} type="button" className="btn btn-primary" onClick={this.handlNext}>Next Page &rarr;</button>
        </div> */}
      </>



    )
  }
}

export default News