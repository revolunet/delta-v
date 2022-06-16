import React from 'react';

import cn from 'classnames';

import { HTMLTags, HTMLTagToVariantMapping, Variant } from './const';
import { Color, getColor, getFontWeight, Weight } from './style/typography.style';

type TextSize =
  | 'text-xs'
  | 'text-sm'
  | 'text-base'
  | 'text-lg'
  | 'text-xl'
  | 'text-2xl'
  | 'text-3xl';

type LineHeight =
  | 'leading-none'
  | 'leading-tight'
  | 'leading-snug'
  | 'leading-normal'
  | 'leading-relaxed'
  | 'leading-loose';

export interface ITypographyProps {
  children: React.ReactNode;
  tag?: HTMLTags;
  size?: TextSize;
  lineHeight?: LineHeight;
  variant?: Variant;
  color?: Color;
  weight?: Weight;
  onClick?: () => void;
}

export const Typography: React.FC<ITypographyProps> = ({
  variant,
  tag,
  color = 'primary',
  size = 'text-sm',
  lineHeight = 'leading-normal',
  children,
  weight = 'normal',
  onClick,
}) => {
  let usedVariant = variant;
  if (usedVariant === null) {
    usedVariant = tag && tag in HTMLTagToVariantMapping ? HTMLTagToVariantMapping[tag] : 'body1';
  }

  const className = cn({
    [`${usedVariant}`]: true,
    [getFontWeight(weight)]: true,
    [getColor(color)]: true,
    [size]: true,
    [lineHeight]: true,
  });
  const CustomTag = tag ?? 'p';

  return (
    <CustomTag onClick={onClick} className={className} data-testid="typography-element">
      {children}
    </CustomTag>
  );
};
