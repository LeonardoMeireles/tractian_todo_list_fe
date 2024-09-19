import '../SearchBar.css';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FilterOption from './FilterOption';
import FilterIcon from '../../../../../assets/Icons/FilterIcon.svg';
import { RootState } from '../../../../../redux';
import { getProjectInfo } from '../../../../../redux/actions/project-action';

function StatusFilter() {
  const filterOptionsRef: MutableRefObject<any> = useRef();
  const dispatch = useDispatch();
  const {projectId} = useParams();
  const searchInput = useSelector((state: RootState) => {
    return state.project.appliedFilter.searchInput;
  });
  const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);
  const [completedSelected, setCompletedSelected] = useState<boolean>(true);
  const [pendingSelected, setPendingSelected] = useState<boolean>(true);

  function handleStatusFilter(completed: boolean, pending: boolean) {
    dispatch(getProjectInfo(projectId, searchInput, completed, pending));
  }

  //Reset selection after changing projects
  useEffect(() => {
    setCompletedSelected(true);
    setPendingSelected(true);
  }, [projectId]);

  //Close option dropdown if clicked outside div
  function useOnClickOutside(ref: MutableRefObject<any>, handler: () => void) {
    useEffect(
      () => {
        const listener = (event: any) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler();
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        };
      },
      [ref, handler]
    );
  }

  useOnClickOutside(filterOptionsRef, () => setShowFilterOptions(false));

  return (
    <div id={'filter-container'}>
      <div id={'filter-button'} onClick={() => setShowFilterOptions(!showFilterOptions)}>
        <img width={16} height={16} src={FilterIcon} alt={'Search Icon'}/>
        <p>Filter by status</p>
      </div>
      {
        showFilterOptions
          ? <>
            <div className="arrow-up"></div>
            <div ref={filterOptionsRef} id={'filter-options-dropdown'}>
              <FilterOption
                value={completedSelected}
                label={'Completed'}
                onOptionSelect={(value: boolean) => {
                  setCompletedSelected(value);
                  handleStatusFilter(value, pendingSelected);
                }}
              />
              <FilterOption
                value={pendingSelected}
                label={'Pending'}
                onOptionSelect={(value: boolean) => {
                  setPendingSelected(value);
                  handleStatusFilter(completedSelected, value);
                }}
              />
            </div>
          </>
          : null
      }
    </div>
  );
}

export default StatusFilter;
