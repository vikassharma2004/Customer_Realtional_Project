import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const FormField = ({ label, name, type = "text", placeholder, value, onChange, required = false }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
