import { Field } from "formik";

const InputField = ({
  id,
  type,
  name,
  label,
  placeholder,
  className,
}: {
  id: string;
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <div className={`w-full group focus-within:text-blue-500 ${className}`}>
      <label htmlFor={id} className="text-sm font-bold ">
        {label}
      </label>
      <div>
        <Field
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className="pb-[4px] font-regular text-sm text-gray-600 w-full border-b-[1px] border-gray-300 outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default InputField;
