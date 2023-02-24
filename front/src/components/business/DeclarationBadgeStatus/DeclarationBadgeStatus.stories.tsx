import { Meta, StoryObj } from '@storybook/react';

import { DeclarationBadgeStatus, DeclarationStatus } from './DeclarationBadgeStatus';

const meta: Meta<typeof DeclarationBadgeStatus> = {
  title: 'Components/Business/DeclarationBadgeStatus',
  component: DeclarationBadgeStatus,
};

export default meta;
type Story = StoryObj<typeof DeclarationBadgeStatus>;

export const Base: Story = {
  args: { status: DeclarationStatus.DRAFT },
};
