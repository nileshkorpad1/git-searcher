import { truncate } from '../../../core/utils/truncate';
import { render, cleanup } from '../../../setupTests';

import { UserListItem } from '../UserListItem';

afterEach(cleanup);

describe('<UserListItem />', () => {
  const props = {
    name: 'name',
    login: 'login',
    description: 'description',
    html_url: 'html_url',
    avatar_url: 'avatar_url',
  };

  it('renders successfully', () => {
    const { container } = render(<UserListItem {...props} />);
    expect(container.firstChild).toHaveClass('user-list-item');
    expect(container.firstChild).toHaveTextContent(
      truncate(props.description, 350)
    );
  });
});
