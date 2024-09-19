import '../SearchBar.css';

interface FilterOptionProps {
  value: boolean,
  label: string,
  onOptionSelect: (optionValue: any) => void;
}

function FilterOption(
  {
    value,
    label,
    onOptionSelect,
  }: FilterOptionProps
) {


  return (
    <div
      className={'filter-option-container'}
      onClick={() => onOptionSelect(!value)}
    >
      <input
        style={{cursor: 'pointer'}}
        readOnly={true}
        type="radio"
        checked={value}
      />
      <p style={{fontSize: '0.75rem', fontWeight: 600}}>{label}</p>
    </div>
  );
}

export default FilterOption;
