'use client';

import { useEffect, useMemo, useState } from 'react';
import { DEGREE_TYPES } from '@/config/degreeTypes';

type DegreeSelectProps = {
  value: string;                       // parent-owned value (single source of truth)
  onChange: (next: string) => void;    // call to update parent
  label?: string;
  maxLen?: number;
  className?: string;
};

export default function DegreeSelect({
  value,
  onChange,
  label = 'Degree Type',
  maxLen = 80,
  className = '',
}: DegreeSelectProps) {
  const isPreset = useMemo(() => DEGREE_TYPES.includes(value), [value]);
  const [customDegree, setCustomDegree] = useState(isPreset ? '' : value);
  const [showCustom, setShowCustom] = useState(!isPreset && value !== '');

  // Keep the custom text aligned if parent value changes externally
  useEffect(() => {
    const nowPreset = DEGREE_TYPES.includes(value);
    setCustomDegree(nowPreset ? '' : value);
    // IMPORTANT: don't auto-hide here; visibility is controlled by user picking "Other"
  }, [value]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === '__OTHER__') {
      setShowCustom(true);      // reveal input
      // Do not call onChange('') here to avoid hiding the input
    } else {
      setShowCustom(false);     // hide input
      onChange(selected);       // commit preset to parent
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.slice(0, maxLen);
    setCustomDegree(next);
    onChange(next);             // commit custom text to parent
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <select
        value={isPreset ? value : '__OTHER__'}
        onChange={handleSelectChange}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <option value="">Select degree</option>
        {DEGREE_TYPES.map((deg) => (
          <option key={deg} value={deg}>{deg}</option>
        ))}
        <option value="__OTHER__">Other</option>
      </select>

      {showCustom && (
        <input
          type="text"
          placeholder="Enter your degree"
          value={customDegree}
          onChange={handleCustomChange}
          maxLength={maxLen}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        />
      )}
    </div>
  );
}
