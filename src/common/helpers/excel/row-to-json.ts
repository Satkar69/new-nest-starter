import * as ExcelJS from 'exceljs';
export function rowToJson<T = any>(row: ExcelJS.Row, headers: ExcelJS.Row): T {
  const rowData: { [key: string]: any } = {};

  row.eachCell({ includeEmpty: true }, (cellValue, index) => {
    if (index == 0) {
      return;
    }
    rowData[headers.getCell(index)?.value?.toString()] = cellValue?.toString().trim() || '';
  });
  return rowData as T;
}
