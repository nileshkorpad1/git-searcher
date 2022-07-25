import { render, cleanup, fireEvent } from '../../../setupTests';

import { SearchField } from '../SearchField';

afterEach(cleanup);

describe('<SearchField />', () => {
  const props = {
    searchTerm: 'search',
    searchCriteria: 'criteria',
    onChange: jest.fn(),
    clear: jest.fn(),
  };

  it('renders successfully', () => {
    const { container } = render(<SearchField {...props} />);
    expect(container.firstChild).toHaveClass('search-form__field');
  });

  it('calls onChange callback when user types', () => {
    const { getByTestId } = render(<SearchField {...props} />);
    const searchInput = getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(props.onChange).toHaveBeenCalled();
  });
});
