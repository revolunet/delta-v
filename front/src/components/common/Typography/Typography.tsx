import React from 'react';

import cn from 'classnames';

import { HTMLTags, HTMLTagToVariantMapping, Variant } from './const';
import {
  Color,
  getActiveColor,
  getColor,
  getTruncate,
  getFontWeight,
  Weight,
  Transform,
  getTextTransform,
} from './style/typography.style';

export type TextSize =
  | 'text-2xs'
  | 'text-xs'
  | 'text-sm'
  | 'text-base'
  | 'text-lg'
  | 'text-xl'
  | 'text-2xl'
  | 'text-3xl'
  | string;

type LineHeight =
  | 'leading-3'
  | 'leading-4'
  | 'leading-5'
  | 'leading-6'
  | 'leading-7'
  | 'leading-8'
  | 'leading-9'
  | 'leading-10'
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
  colorGradient?: string;
  weight?: Weight;
  italic?: boolean;
  transform?: Transform;
  underline?: boolean;
  activeColor?: Color;
  textPosition?: 'text-left' | 'text-center' | 'text-right';
  truncate?: boolean;
  onClick?: () => void;
}

export const Typography: React.FC<ITypographyProps> = ({
  variant,
  tag,
  color = 'primary',
  colorGradient = '600',
  size = 'text-sm',
  lineHeight = 'leading-normal',
  children,
  weight = 'normal',
  italic = false,
  underline = false,
  activeColor,
  textPosition,
  truncate = false,
  transform,
  onClick,
}) => {
  let usedVariant = variant;
  if (usedVariant === null) {
    usedVariant = tag && tag in HTMLTagToVariantMapping ? HTMLTagToVariantMapping[tag] : 'body1';
  }

  const className = cn({
    // [`${usedVariant}`]: true,
    [getFontWeight(weight)]: true,
    [getColor(color, colorGradient)]: true,
    [getActiveColor(activeColor)]: activeColor,
    [size]: true,
    [lineHeight]: true,
    italic,
    underline,
    [`${textPosition}`]: true,
    [getTruncate(truncate)]: truncate,
    [getTextTransform(transform)]: transform,
  });
  const CustomTag = tag ?? 'span';

  return (
    <CustomTag onClick={onClick} className={className} data-testid="typography-element">
      {children}
    </CustomTag>
  );
};
