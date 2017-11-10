import React from 'react';
import { NavLink } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';

const FilterLink = ({ filter, children }) => (
  <FlatButton>
  <NavLink
    exact
    to={filter === 'all' ? '/' : `/${filter}`}
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </NavLink>
  </FlatButton>
)

export default FilterLink
