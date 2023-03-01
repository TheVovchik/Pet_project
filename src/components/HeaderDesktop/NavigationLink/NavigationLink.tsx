/* eslint-disable import/no-extraneous-dependencies */
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './NavigationLink.scss';

type Props = {
  name: string,
  path: string,
};

export const NavigationLink: FC<Props> = ({ name, path }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => classNames(
        'nav-link',
        { 'nav-link--active': isActive },
      )}
    >
      {name}
    </NavLink>
  );
};
