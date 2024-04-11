import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { ModalFilterBarDesktop } from './ModalFilterBarDesktop';
import { FilterBarForm } from './types';
import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { PeriodInput } from '@/components/input/StandardInputs/PeriodInput';

export type FilterBarDesktopProps = {
  onSubmit: any;
  onResetFilter?: () => void;
  filterBarData?: FilterBarForm;
};

export const FilterBarDesktop = ({
  onSubmit,
  onResetFilter,
  filterBarData,
}: FilterBarDesktopProps) => {
  const [openModal, setOpenModal] = useState(false);

  const { register, control, handleSubmit, setValue } = useForm<FilterBarForm>({
    defaultValues: {
      status: filterBarData?.status ?? [],
      meanOfTransport: filterBarData?.meanOfTransport ?? [],
      newsTags: filterBarData?.newsTags ?? [],
      startDate: filterBarData?.startDate ?? null,
      endDate: filterBarData?.endDate ?? null,
      search: filterBarData?.search ?? null,
    },
  });

  useEffect(() => {
    setValue('startDate', filterBarData?.startDate);
    setValue('endDate', filterBarData?.endDate);
    setValue('search', filterBarData?.search ?? null);
  }, [filterBarData]);

  return (
    <div className="flex flex-col rounded-xl bg-gray-100 p-5 max-w-[781px] ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-4 items-center">
            <input
              data-testid="input-search-element"
              enterKeyHint="search"
              placeholder="Thèmes, mots-clés..."
              className="block w-full rounded-full py-2 px-5 text-base placeholder:font-light placeholder:italic placeholder:text-placeholder focus:border-secondary-300 focus:outline-none focus:ring-transparent border-none"
              {...register('search')}
            />
            <PeriodInput
              noBorder
              endDateName="endDate"
              startDateName="startDate"
              control={control}
            />
            <button
              type="submit"
              className="flex flex-row gap-5 bg-primary-600 rounded-full text-white items-center justify-center px-5 py-2.5 h-[34px]"
            >
              <Typography size="text-2xs" color="white">
                Rechercher
              </Typography>
              <Icon name="search" size="sm" color="white" />
            </button>
          </div>
          <div className="flex flex-row gap-5 ml-5" onClick={() => setOpenModal(true)}>
            <div className="flex flex-row gap-1.5 items-center">
              <Icon name="filter" size="sm" color="black" />
              <Typography size="text-xs" color="black" weight="bold">
                Plus de filtres
              </Typography>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon name="chevron-thin-down" size="sm" color="black" />
            </div>
          </div>
        </div>
      </form>
      <ModalFilterBarDesktop
        withStatusFilter={true}
        withMeanOfTransportFilter={true}
        onValidateFilter={onSubmit}
        filterBarData={filterBarData}
        open={openModal}
        setOpen={setOpenModal}
        onResetFilter={onResetFilter}
      />
    </div>
  );
};
