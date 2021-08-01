import { Field } from "formik";

const InputField = ({
  id,
  type,
  name,
  label,
}: {
  id: string;
  type: string;
  name: string;
  label?: string;
}) => {
  return (
    <div className="w-full group focus-within:text-blue-500">
      <label htmlFor={id} className="text-xs font-bold ">
        {label}
      </label>
      <div>
        <Field
          id={id}
          name={name}
          type={type}
          className="pb-[4px] font-regular text-xs text-gray-600 w-full border-b-[1px] border-gray-300 outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default InputField;
