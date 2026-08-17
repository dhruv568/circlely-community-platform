'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface FilterSelectProps {
  name: string;
  label?: string;
  defaultValue?: string;
  options: string[];
  className?: string;
}

export function FilterSelect({ name, label, defaultValue, options, className }: FilterSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'All') {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentValue = searchParams.get(name) || defaultValue || 'All';

  return (
    <div>
      {label && <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{label}</label>}
      <select
        name={name}
        value={currentValue}
        onChange={handleChange}
        className={className || "w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
