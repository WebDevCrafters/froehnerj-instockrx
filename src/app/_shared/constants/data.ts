import { Package } from '../dataTypes/Package';

export const packageOptions: Package[] = [
  {
    id: '1',
    title: 'One Med Search',
    cost: 50,
    searches: 1,
    description:
      "Get a full refund if we don't find your medication!",
  },
  {
    id: '2',
    title: 'Three Med Searches',
    cost: 120,
    searches: 3,
    description:
      'Most popular package. Use remaining searches anytime in the future for any medications.',
  },
  {
    id: '3',
    title: 'Six Med Searches',
    cost: 180,
    searches: 6,
    description:
      'Best value! Use remaining searches any time in the future, for any medication.',
  },
];

export const defaultPackage = packageOptions[1];
