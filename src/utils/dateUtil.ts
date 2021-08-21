import { format } from 'date-fns';
import brLocale from 'date-fns/locale/pt-BR';

export const formatDate = (date: Date) => {
  return format(date, 'dd/MM/yyyy', {
    locale: brLocale,
  });
};
