import { FieldValues, UseFormReturn } from "react-hook-form";

import { Input as NextInput } from "@nextui-org/react";

type InputProps = {
  form: UseFormReturn<any, any, undefined>;
  label: string;
  placeholder: string;
  name: string;
  type?: string;
};

const Input = ({ form, label, placeholder, name, type = "text" }: InputProps) => {
  const error = form.formState.errors[name];

  return (
    <div className="flex flex-col gap-2 py-2">
      <NextInput
        label={label}
        placeholder={placeholder}
        type={type}
        {...form.register(name)}
        isInvalid={!!error}
        style={{
          fontSize: "18px",
        }}
        description={error?.message as string}
      />
    </div>
  );
};

export default Input