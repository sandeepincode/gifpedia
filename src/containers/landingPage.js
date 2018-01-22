import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StackGrid from "react-stack-grid";
import Nav from '../components/Nav';
import Loader from '../components/Loader';
import Resizers from '../components/Resizers';
import {
  fetchRequest,
  updateSearchString,
  updateTrendingTask,
  setSmallGif,
  setMedGif,
  setLargeGif,
} from '../redux/reducers/root';

function mapStateToProps({root}) {
  const { ui, data } = root;
  return {
    grid: ui.grid,
    loading: ui.loading,
    error: data.error,
    response: data.response,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRequest,
    updateSearchString,
    updateTrendingTask,
    setSmallGif,
    setMedGif,
    setLargeGif,
  }, dispatch);
}

class landingPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const gifComponents = [];
    const errors = [];

    if ( this.props.response ) {
      Object.values(this.props.response).forEach((gif, index) => {

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        const rgb = "rgb(" + r + "," + g + "," + b + ")";

        gifComponents.push((
          <div style={{backgroundColor: rgb }} key={index}>
            <div style={{margin: 0, padding: 0, backgroundImage: `url(${gif.images.fixed_width_still.url})`}}>
              <img src={gif.images.fixed_width.url} height={this.props.grid} width={this.props.grid}/>
            </div>
          </div>
        ));
      });
    }

    if( this.props.error ){
      this.props.error.forEach((error) => {
        errors.push((
          <div className="alert alert-danger text-center">
            {error}
          </div>
        ));
      });
    }

    return (
      <div>

        { errors }

        <div>

          <Nav {...this.props} />

          <Loader {...this.props} />

          <Resizers {...this.props} />

          <div>
            <StackGrid columnWidth={this.props.grid}>
              { gifComponents }
            </StackGrid>
          </div>

        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(landingPage);
