import { ChangeEvent, forwardRef } from 'react';
interface IProps {
  searchTerm: string;
  searchCriteria?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
}

export const SearchField = forwardRef<HTMLInputElement, IProps>(
  ({ searchTerm, onChange, clear }, ref) => {
    const placeholder = 'Start Typing to Search';

    return (
      <div className="search-form__field">
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={onChange}
          data-testid="search-input"
        />
      </div>
    );
  }
);
