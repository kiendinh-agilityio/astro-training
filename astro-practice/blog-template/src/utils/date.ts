const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric',
});

export const formatDate = (value?: string): string => {
  if (!value) return '';

  try {
    return dateFormatter.format(new Date(value));
  } catch {
    return value;
  }
};
