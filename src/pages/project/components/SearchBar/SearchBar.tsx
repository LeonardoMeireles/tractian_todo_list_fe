import './SearchBar.css';
import { useEffect, useState } from 'react';
import SearchIcon from '../../../../assets/Icons/SearchIcon.svg';
import TextInput from '../../../../components/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux';
import { getProjectInfo } from '../../../../redux/actions/project-action';
import { useParams } from 'react-router-dom';
import StatusFilter from './StatusFilter/StatusFilter';

function SearchBar() {
  const dispatch = useDispatch();
  const {projectId} = useParams();
  const appliedFilter = useSelector((state: RootState) => {
    return state.project.appliedFilter;
  });
  const [searchInput, setSearchInput] = useState<string>('');
  //Reset search after changing projects
  useEffect(() => {
    setSearchInput('');
  }, [projectId]);

  function handleInputSearch() {
    if (appliedFilter.searchInput !== searchInput) {
      dispatch(getProjectInfo(projectId, searchInput, appliedFilter.status.completed, appliedFilter.status.pending));
    }
  }


  return (
    <div id={'search-bar-container'}>
      <img
        id={'search-icon'}
        style={{cursor: 'pointer'}}
        onClick={() => handleInputSearch()}
        width={16}
        height={16}
        src={SearchIcon}
        alt={'Search Icon'}
      />
      <TextInput
        inputValue={searchInput}
        onChange={(value) => setSearchInput(value)}
        onBlur={() => handleInputSearch()}
        onEnter={() => handleInputSearch()}
        padding={'0.5em'}
        name={'searchInput'}
        placeholder={'Search'}
      />
      <StatusFilter/>
    </div>
  );
}

export default SearchBar;
