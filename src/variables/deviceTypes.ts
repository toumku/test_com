export const deviceTypes = ['Компьютер', 'Зөөврийн компьютер'] as const;

export type DeviceType = (typeof deviceTypes)[number];
