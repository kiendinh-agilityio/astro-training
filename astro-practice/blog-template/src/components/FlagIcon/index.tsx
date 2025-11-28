import { type FC } from 'react';

import { Icons } from '@/components';
import type { SupportedLanguage } from '@/types';

const FlagIcon: FC<{ code: SupportedLanguage }> = ({ code }) => {
  const IconComponent = code === 'en' ? Icons.EnglishFlag : Icons.VietnamFlag;
  return <IconComponent className="h-5 w-7 shrink-0 rounded-sm object-cover" />;
};

export default FlagIcon;
