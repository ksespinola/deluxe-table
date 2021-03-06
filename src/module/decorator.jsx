import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { scrollTable } from './duck';
import selector from './selector';
import hamster from 'hamsterjs';

const mapDispatch = (dispatch, { scope, headerHeight }) => ({
  actions: {
    onScrollTable: (e) => dispatch(scrollTable({ scope, e, yBound: headerHeight })),
  },
});


const deluxeTable = Component => {
  class DecoratedComponent extends React.Component {
    componentDidMount() {
      hamster(findDOMNode(this)).wheel((event, delta, deltaX, deltaY) => {
        event.preventDefault();
        event.stopPropagation();
        this.props.actions.onScrollTable({ deltaX, deltaY })
      });
    }

    render() {
      return <Component {...this.props} />;
    }
  }


  return connect(
    selector,
    mapDispatch
  )(DecoratedComponent);
};

export default deluxeTable;
