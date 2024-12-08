import React from "react";
import { BasicService } from "../types/calculator";

interface ServiceCheckboxProps {
  service: BasicService;
  onChange: (id: string, checked: boolean) => void;
}

export function ServiceCheckbox({ service, onChange }: ServiceCheckboxProps) {
  return (
    <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={service.selected}
        onChange={(e) => onChange(service.id, e.target.checked)}
        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="flex-1 text-gray-700">{service.name}</span>
      {/* Uncomment if you want to Display the price with the services */}
      {/* <span className="text-gray-500">${service.price}</span> */}
    </label>
  );
}
