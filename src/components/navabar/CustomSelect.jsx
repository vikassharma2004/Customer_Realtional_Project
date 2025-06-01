import {
      Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}from "../ui/select.jsx";


export const CustomSelect = ({ data = [], onChange }) => (
  <Select onValueChange={onChange}>
    <SelectTrigger className="w-[150px] py-5 border border-blue-500  focus:ring-0 focus:ring-offset-0 focus:border-blue-600 text-md">
      <SelectValue placeholder="Select organization" />
    </SelectTrigger>
    <SelectContent>
      {data.map((org) => (
        <SelectItem
          key={org.id}
          value={org.id}
          className="text-sm font-medium"
        >
          {org.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
