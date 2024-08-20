import { Button } from '@mui/material'
import { FormDataArrayKeys } from '../../@type/forms';

interface MultiSelectProps {
  items: string[];
  category: FormDataArrayKeys;
  selectedItems: string[];
  onItemSelect: (category: FormDataArrayKeys, item: string) => void;
}

export default function MultiSelect({ items, category, selectedItems, onItemSelect }: MultiSelectProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <Button
          key={item}
          variant={selectedItems.includes(item) ? "contained" : "outlined"}
          onClick={() => onItemSelect(category, item)}
          className="rounded-full"
        >
          {item}
        </Button>
      ))}
    </div>
  )
}
