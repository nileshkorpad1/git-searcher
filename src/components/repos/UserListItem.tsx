import { FC } from 'react';

import { User } from '../../core/entities/dataEntities';
import { truncate } from '../../core/utils/truncate';

interface IProps {
  login: User['login'];
  name: User['name'];
  description: User['description'];
  html_url: User['html_url'];
  avatar_url: User['avatar_url'];
}

export const UserListItem: FC<IProps> = ({
  name,
  login,
  description,
  html_url,
  avatar_url,
}) => {
  const truncatedDescription = truncate(description ?? '', 350);
  const displayName = name || login;

  return (
    <li className="user-list-item">
      <div className="repo-icon">
        <img
          src={avatar_url}
          className="user-avatar"
          alt="Users avatar"
        />
      </div>
      <div className="user-info">
        <div className="repo-name">
          <a
            href={html_url}
            className="repo-link"
            target="_blank"
            rel="noreferrer"
          >
            <span className="user-name">{displayName}</span>
          </a>
        </div>
        <p className="user-description">{truncatedDescription}</p>
      </div>
    </li>
  );
};
