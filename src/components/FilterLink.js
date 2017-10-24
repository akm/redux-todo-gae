import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Link from './Link'
import { setVisibilityFilter } from '../actions/TodoActions'

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWilUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    return (
      <Link
        active={props.filter ===state.visibilityFilter}
        onClick={() =>
          store.dispatch(setVisibilityFilter(props.filter))
        }
      >
        {props.children}
      </Link>
    );
  }
}
FilterLink.contextTypes = {
  store: PropTypes.object
}

export default FilterLink
