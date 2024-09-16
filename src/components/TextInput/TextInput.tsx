import './TextInput.css';

interface TextInputProps {
  name: string,
  placeholder: string,
  minHeight: string,
  padding: string,
  inputValue?: string | number,
  onChange?: (value: string) => void,
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
