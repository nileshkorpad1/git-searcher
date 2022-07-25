import {
  render,
  cleanup,
  mockedUseSelector
} from '../../../setupTests';

import { ReposList } from '../ReposCards';

afterEach(cleanup);

describe('<ReposList />', () => {
  it('renders successfully', () => {
    const { container } = render(<ReposList />);
    expect(container.firstChild).toHaveClass('container');
  });

  it('calls useSelector for selecting needed state from the store', () => {
    render(<ReposList />);
    expect(mockedUseSelector).toHaveBeenCalled();
  });
});
