export const ranks = ['Дэд ахлагч', 'Ахлагч'] as const;

export type Rank = (typeof ranks)[number];
