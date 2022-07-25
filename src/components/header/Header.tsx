import { FC } from 'react';

import { ReactComponent as Logo } from '../../icons/logo.svg';
import { Search } from '../search';

import './styles.scss';

export const Header: FC = () => {
  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-logo">
          <Logo />
        </div>
        <div className="header-title">
          <h1>GitHub Searcher</h1>
          <p>Search Users or Repositories below</p>
        </div>

      </div>
      <Search />
    </header>
  );
};
