import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils";

type TextAreaInputProps = {
    label: string;
    name: string;
    errors: Record<string, string[]>;
    placeholder: string;
    disabled?: boolean;
    value: string;
    className?: string;
    register?: boolean;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextAreaInput({
    label,
    name, 
    errors, 
    placeholder, 
    disabled,
    value, 
    className="col-span-full",
    register,
    onChange,
}: TextAreaInputProps) {

  return (

    <div className={cn("grid gap-2", className)}>
      <Label 
        htmlFor={name} 
        className="text-slate-700 dark:text-slate-200"
      >{label}
      </Label>
        <Textarea 
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            autoCapitalize="none"
            autoComplete="name"
            autoCorrect="off"
            disabled={disabled}
            className="bg-slate-50 dark:bg-slate-700 
            dark:text-slate-200 dark:placeholder-slate-200"
            onChange={onChange}
        />
        {errors[name] && (<span className="text-red-600 text-sm">{errors[name]}</span>)}
    </div>

  )
}
