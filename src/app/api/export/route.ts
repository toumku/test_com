import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { db } from '@/lib/db'; // your drizzle db instance
import { devicesTable, employeesTable, usersTable } from '@/lib/db/tables';

export async function GET(req: NextRequest) {
  // Fetch all data from 3 tables
  const [users, devices, employees] = await Promise.all([
    db.select().from(usersTable),
    db.select().from(devicesTable),
    db.select().from(employeesTable),
  ]);

  const workbook = new ExcelJS.Workbook();

  // Helper to add a worksheet
  const addSheet = (title: string, data: any[]) => {
    const sheet = workbook.addWorksheet(title);

    if (data.length > 0) {
      sheet.columns = Object.keys(data[0]).map(key => ({
        header: key,
        key,
        width: 20,
      }));
      sheet.addRows(data);
    }
  };

  addSheet('Users', users);
  addSheet('Devices', devices);
  addSheet('Employees', employees);

  // Generate the Excel file
  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Disposition': 'attachment; filename="data.xlsx"',
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  });
}
