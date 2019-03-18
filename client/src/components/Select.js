import React from "react";

export default function Select({
  defaultOption,
  id,
  items,
  label,
  name,
  onChange,
  value
}) {
  return [
    <label htmlFor={id}>{label}</label>,
    <select id={id} name={name} value={value} onChange={onChange}>
      <option value="" disabled>
        {defaultOption}
      </option>
      {items.map(item => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  ];
}
