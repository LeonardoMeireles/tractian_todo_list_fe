import './SearchBar.css';
import { useState } from 'react';
import SearchIcon from '../../../../assets/Icons/SearchIcon.svg';
import FilterIcon from '../../../../assets/Icons/FilterIcon.svg';
import TextInput from '../../../../components/TextInput/TextInput';

function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>();

  return (
    <div id={'search-bar-container'}>
      <img width={16} height={16} src={SearchIcon} alt={'Search Icon'}/>
      <TextInput
        inputValue={searchInput}
        onChange={(value) => setSearchInput(value)}
        padding={'0.5em'}
        minHeight={'1em'}
        name={'searchInput'}
        placeholder={'Search'}
      />
      <div id={'filter-container'}>
        <img width={16} height={16} src={FilterIcon} alt={'Search Icon'}/>
        <p>Filter by status</p>
      </div>
    </div>
  );
}

export default SearchBar;
