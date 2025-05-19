import * as ExcelJS from 'exceljs';
import AppException from 'src/application/exception/app.exception';

export function validateHeader(header: ExcelJS.Row, requiredFields: string[]): string[] {
  if (!header) throw new AppException({}, 'Unable to find required headers', 422);
  header.eachCell((cell) => {
    if (cell.value && cell?.value?.toString() && requiredFields.includes(cell?.value?.toString().trim())) {
      requiredFields.splice(requiredFields.indexOf(cell?.value?.toString().trim()), 1);
    }
  });
  return requiredFields;
}
