import React, { Component } from 'react';
import Loadable from 'react-loading-overlay'

class Loader extends Component {
  render() {

    const styles = {
      loader: {
        margin: '50px',
      },
    };

    return (
      <div style={styles.loader}>
        <Loadable
          active={this.props.loading}
          spinner
          spinnerSize='100px'
          text='Fetching your Gifs...'
        >
        </Loadable>
      </div>
    );
  }
}

export default Loader;
