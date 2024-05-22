import React, { useEffect } from 'react';

import { motion } from 'framer-motion';
import { Alpha2Code } from 'i18n-iso-countries';
import shallow from 'zustand/shallow';

import { FormSelectCountry } from '../FormSelectCountry';
import { Typography } from '@/components/atoms/Typography';
import { useStore } from '@/stores/store';
import { ModalType, getModalComponent } from '@/utils/modal';

interface ModalSelectCountryProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelect?: (country: Alpha2Code) => void;
  preventClose?: boolean;
  modalType?: ModalType;
  defaultCountry?: Alpha2Code;
}

export const ModalSelectCountry: React.FC<ModalSelectCountryProps> = ({
  isOpen = false,
  onClose,
  onSelect,
  preventClose = false,
  modalType = ModalType.DOWN,
  defaultCountry,
}) => {
  const {
    setProductsNomenclatureToDisplay,
    setCountryForProductsNomenclature,
    countryForProductsNomenclature,
  } = useStore(
    (state) => ({
      setProductsNomenclatureToDisplay: state.setProductsNomenclatureToDisplay,
      setCountryForProductsNomenclature: state.setCountryForProductsNomenclature,
      countryForProductsNomenclature: state.products.appState.countryForProductsNomenclature,
    }),
    shallow,
  );

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (!countryForProductsNomenclature) {
      return;
    }
    setProductsNomenclatureToDisplay(countryForProductsNomenclature);
  }, []);

  const ModalComponent = getModalComponent(modalType);

  const onSelectCountry = (country: Alpha2Code) => {
    if (onSelect) {
      onSelect(country);
    }
    setCountryForProductsNomenclature(country);
    handleClose();
  };

  return (
    <ModalComponent
      bgColor="bg-white"
      open={isOpen}
      onClose={onClose}
      preventClose={preventClose}
      noInitialFocus
    >
      <motion.div className="mx-auto w-[268px] gap-5 flex flex-col h-auto">
        <Typography
          color="black"
          size="text-xs"
          desktopSize="text-xs"
          weight="bold"
          textPosition="text-center"
        >
          Sélectionner le pays de provenance :
        </Typography>
        <FormSelectCountry onSelectCountry={onSelectCountry} defaultCountry={defaultCountry} />
      </motion.div>
    </ModalComponent>
  );
};
