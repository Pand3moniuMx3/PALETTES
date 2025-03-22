import "../styles/Authentication.css";

export default function TextInput({
  children,
  placeholder,
  value,
  onChange,
  disabledCondition = false,
  incorrectCondition = false,
}) {
  return (
    <div
      className={`input-wrapper ${value !== "" && "active"} ${
        incorrectCondition && "incorrect"
      }
    }`}
    >
      {children}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabledCondition}
      />
    </div>
  );
}
