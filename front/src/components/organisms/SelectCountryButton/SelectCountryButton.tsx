import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';

export interface SelectCountryButtonProps {
  onClick: () => void;
  label?: string;
}

export const SelectCountryButton: React.FC<SelectCountryButtonProps> = ({ onClick, label }) => {
  return (
    <div className="flex flex-row gap-[10px] items-center cursor-pointer" onClick={onClick}>
      <Typography color="black" size="text-2xs" weight="bold" desktopSize="text-sm">
        {label ?? 'Sélectionner le pays de provenance'}
      </Typography>
      <Icon name="chevron-down" size="lg" />
    </div>
  );
};
