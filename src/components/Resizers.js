import React, { Component } from 'react';

class Resizers extends Component {
  render() {

    const styles = {
      gifSizers: {
        marginBottom: '5px',
        background:'rgb(232, 219, 124)',
        borderRadius: '20px',
        boxShadow: 'none',
        border: 'none',
        textShadow: 'none',
        color: 'black',
        width: '200px',
        height: 'auto',
        fontSize:'15px',
        letterSpacing:'5px',
      }
    };

    return (
      <nav className="navbar-fixed-bottom">
        <div className="container">
          <div className="row text-center">
            <div className="col-sm-4">
              <button className="btn btn-default navbar-btn"
                      style={styles.gifSizers}
                      onClick={this.props.setSmallGif}
              >
                <strong>
                  SMALL
                </strong>
              </button>
            </div>

            <div className="col-sm-4">
              <button className="btn btn-default navbar-btn"
                      style={styles.gifSizers}
                      onClick={this.props.setMedGif}
              >
                <strong>
                  MEDIUM
                </strong>
              </button>
            </div>

            <div className="col-sm-4">
              <button className="btn btn-default navbar-btn"
                      style={styles.gifSizers}
                      onClick={this.props.setLargeGif}
              >
                <strong>
                  LARGE
                </strong>
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Resizers;
