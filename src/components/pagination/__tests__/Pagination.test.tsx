import {
  fetchUsers,
  fetchRepos,
} from '../../../core/redux/actions/data/data.thunks';
import { render, cleanup } from '../../../setupTests';

import { Pagination, createDataFetcher } from '../Pagination';

afterEach(cleanup);

describe('<Pagination />', () => {
  it('renders successfully', () => {
    const { container } = render(<Pagination length={4} />);
    expect(container.firstChild).toHaveClass('pagination-container');
    expect(container.firstChild?.firstChild).toHaveClass('pagination');
  });

  it('contains pagination text', () => {
    const length = 5;
    const { container } = render(<Pagination length={length} />);
    expect(container).toHaveTextContent(`out of ${length} pages`);
  });

  it('uses correct dataFetcher', () => {
    const reposFetcher = createDataFetcher('Repositories');
    const orgsFetcher = createDataFetcher('Users');
    const wrongFetcher = createDataFetcher('wrong');

    expect(reposFetcher).toEqual(fetchRepos);
    expect(orgsFetcher).toEqual(fetchUsers);
    expect(wrongFetcher).toBeNull();
  });
});
