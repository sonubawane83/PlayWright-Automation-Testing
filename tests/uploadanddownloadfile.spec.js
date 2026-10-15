const Exceljs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeexcelTest(searchText, replaceText, change, filepath) {


    // output is object of row and column
    const workbook = new Exceljs.Workbook();  // open workbook
    await workbook.xlsx.readFile(filepath);// Update the operation and it is Asynchronous operation So
    // JavaScript to await to complete the operation
    const worksheet = workbook.getWorksheet('Sheet1');  // sheet name 

    const output = await readExcel(worksheet, searchText, change);  //Asynchronous so give a await here 

    const cell = worksheet.getCell(output.row, output.column + change.colChange); // row, col
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filepath);


}



async function readExcel(worksheet, searchText) {

    let output = { row: -1, column: -1 }; //decleared globally and re-used in class 
    worksheet.eachRow((row, rowNumber) => {         // row



        row.eachCell((cell, colNumber) => {            // cell col 
            //     console.log(cell.value);           // print the cell and col
            if ((cell.value == searchText)) {

                //  console.log(rowNumber);
                // console.log(colNumber);
                // Access any where in the project 
                output.row = rowNumber;
                output.column = colNumber;



            }


        })

    })
    return output;
}
// update the plum price with 350 using 
//writeexcelTest("Papaya", "Plum","C:/Users/bawan/Downloads/download.xlsx")
//writeexcelTest("Plum", 350 ,{rowChange:0,colChange:2},"C:/Users/bawan/Downloads/download.xlsx")

test('Upload and Download Validation and edit ', async ({ page }) => {


    const textseacrch = 'Papaya';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();

    const download = await downloadPromise;
    const filepath = "C:/Users/bawan/Downloads/download.xlsx";
    await download.saveAs(filepath);

    writeexcelTest(textseacrch, updateValue, { rowChange: 0, colChange: 2 }, filepath);
    await page.locator("input[type='file']").click();
    await page.locator("input[type='file']").setInputFiles(filepath);
    const textlocator = page.getByText(textseacrch);
    const desiredRow = await page.getByRole('row').filter({ has: textlocator });
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);     // row locator  // assertion


})