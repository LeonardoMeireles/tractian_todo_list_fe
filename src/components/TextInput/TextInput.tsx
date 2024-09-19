import './TextInput.css';

interface TextInputProps {
  name: string,
  placeholder: string,
  minHeight: string,
  padding: string,
  inputValue?: string | number,
  onChange?: (value: string) => void,
  onBlur?: (value: string) => void,
  onEnter?: (value: string) => void,
  required?: boolean,
  type?: string
}

function TextInput(
  {
    name,
    placeholder,
    minHeight,
    padding,
    inputValue,
    onChange,
    onBlur,
    onEnter,
    required = false,
    type = 'text',
  }: TextInputProps
) {

  return (
    <div className={'input-container'}>
      <input
        value={inputValue}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        onBlur={(e) => {
          if (onBlur) onBlur(e.target.value);
        }}
        onKeyDown={(e) => {
          if (onEnter && e.key === 'Enter') onEnter((e.target as HTMLInputElement).value);
        }}
        style={{
          minHeight,
          padding,
        }}
        required={required}
        name={name}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}

export default TextInput;
