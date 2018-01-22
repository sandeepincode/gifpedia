import React, { Component } from 'react';
import eventToAction from '../util/eventToAction';

class Nav extends Component {

  constructor(props){
    super(props);
    this.handleTrending = this.handleTrending.bind(this);
  }

  handleTrending() {
    this.props.updateTrendingTask();
    this.props.fetchRequest();
  }

  render() {

    const styles = {
      navBar:{
        position: 'fixed',
      },
      navHeading: {
        fontSize: '58px',
      },
      searchIcon: {
        fontSize: '35px',
        color: 'rgb(0,0,0)',
      },
      searchBox: {
        maxWidth:'2000px',
        minWidth:'100px',
        backgroundColor: 'rgba(177,87,87,0)',
        fontSize: '20px',
        height:'40px',
        marginLeft:'13px',
      },
      trending: {
        backgroundColor:'rgb(123,225,232)',
        paddingRight:'35px',
        paddingLeft:'35px',
        lineHeight:'21px',
        fontSize:'15px',
        letterSpacing:'5px',
      },
      searching: {
        backgroundColor: 'rgb(230,123,232)',
        marginRight: '19px',
        paddingRight: '40px',
        paddingLeft: '40px',
        fontSize: '15px',
        letterSpacing: '5px',
        lineHeight: '21px'
      },
    };

    return (
      <nav className="navbar navbar-default navigation-clean-search">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#" style={styles.navHeading}>GifPedia</a>
            <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navcol-1">
            <form className="navbar-form navbar-left" target="_self">
              <div className="form-group">
                <label className="control-label">
                  <i className="glyphicon glyphicon-search" style={styles.searchIcon}/>
                </label>
                <input onChange={eventToAction(this.props.updateSearchString)}
                       className="form-control search-field"
                       type="search"
                       name="search"
                       id="search-field"
                       style={styles.searchBox}/>

              </div>
            </form>

            <a className="btn btn-default navbar-btn navbar-right action-button"
               role="button"
               style={styles.trending}
               disabled={this.props.loading}
               onClick={this.handleTrending}
            >
              TRENDING
            </a>

            <a className="btn btn-default navbar-btn navbar-right action-button"
               disabled={this.props.loading}
               onClick={this.props.fetchRequest}
               role="button"
               style={styles.searching}
            >
              SEARCH
            </a>

          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
