import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style-v2";

const exportAsSheetByJSON = ({ excelData, fileName }) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    wb.Sheets.data["!cols"] = [{ wch: 30 }];
    wb.Sheets.data["!cols"][2] = { wch: 30 };
    wb.Sheets.data["!cols"][3] = { wch: 20 };
    wb.Sheets.data["!cols"][4] = { wch: 20 };
    wb.Sheets.data["!cols"][5] = { wch: 30 };
    wb.Sheets.data["!cols"][6] = { wch: 30 };
    wb.Sheets.data["!cols"][7] = { wch: 30 };
    wb.Sheets.data["!cols"][8] = { wch: 30 };
    wb.Sheets.data["!cols"][9] = { wch: 30 };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
};

const exportAsSheetByTable = ({ tableID, fileName }) => {
    const table = document.getElementById(tableID);

    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.table_to_book(table);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
};

export { exportAsSheetByJSON, exportAsSheetByTable };
