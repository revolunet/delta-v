/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';

import { useController } from 'react-hook-form';

import { FilterItem } from './FilterItem';
import { Typography } from '@/components/atoms/Typography';
import { FilterOptions } from '@/utils/filters';

export type FilterGroupProps = {
  title: string;
  filters: FilterOptions[];
  control?: any;
  name: string;
  rules?: any;
  isMobile?: boolean;
  onChange?: (value: string[]) => void;
};

export const FilterGroup = ({
  title,
  filters,
  control,
  name,
  rules,
  onChange,
}: FilterGroupProps) => {
  const { field } = useController({
    control,
    name,
    rules,
  });

  const handleSelectFilter = (id: string) => {
    const selectedValues: string[] = field.value;
    if (selectedValues.includes(id)) {
      selectedValues.splice(selectedValues.indexOf(id), 1);
      field.onChange(selectedValues);
      onChange && onChange(selectedValues);
    } else {
      field.onChange([...selectedValues, id]);
      onChange && onChange([...selectedValues, id]);
    }
  };

  const isActiveFilter = (value: string) => {
    return field.value.includes(value);
  };

  return (
    <div className="flex-start flex flex-col gap-2.5 md:gap-5">
      <Typography color="black" size="text-xs">
        {title}
      </Typography>

      <div className="flex flex-wrap gap-2.5 pr-6">
        {filters.map((item, index) => (
          <FilterItem
            key={index}
            filter={item}
            onClick={handleSelectFilter}
            isActive={isActiveFilter(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
