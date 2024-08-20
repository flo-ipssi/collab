import React from 'react'

interface MultiSelectProps {
  items: string[]
  category: string
  selectedItems: string[]
  onSelect: (category: string, item: string) => void
  className?: string
}

const MultiSelect: React.FC<MultiSelectProps> = ({ items, category, selectedItems, onSelect, className = '' }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map(item => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(category, item)}
          className={`px-4 py-2 rounded-full border ${
            selectedItems.includes(item) ? "bg-blue-500 text-white" : "bg-white text-black"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default MultiSelect
