import z from 'zod/v4';

export const deviceEmployeeChartSchema = z.object({
  timeRange: z.string().min(1),
});

export type DeviceEmployeeChartSchema = z.infer<
  typeof deviceEmployeeChartSchema
>;
