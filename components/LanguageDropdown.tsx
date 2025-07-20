'use client';

import { useState } from 'react';

type Props = {
  languages: string[];
  selected: string;
  onSelect: (language: string) => void;
};

export default function LanguageDropdown({ languages, selected, onSelect }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block w-[8rem] text-left">
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm flex justify-between items-center hover:border-gray-500 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700">{selected}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {languages.map((lang) => (
            <li
              key={lang}
              onClick={() => {
                onSelect(lang);
                setOpen(false);
              }}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
