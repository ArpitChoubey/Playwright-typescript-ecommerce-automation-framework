import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

export class DataProvider {

    //  Read JSON Test Data
    static getTestDataFromJson(filePath: string) {
        try {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            return data;
        } catch (error) {
            console.error(`Error reading JSON file: ${error}`);
            throw error;
        }
    }

    //  Read CSV Test Data
    static getTestDataFromCsv(filePath: string) {
        try {
            const data = parse(fs.readFileSync(filePath), {
                columns: true,
                skip_empty_lines: true
            });
            return data;
        } catch (error) {
            console.error(`Error reading CSV file: ${error}`);
            throw error;
        }
    }

    //  SparkleCart Specific Data Helpers

    // Login Data
    static getLoginData() {
        return this.getTestDataFromJson('testdata/loginData.json');
    }

    // Search Product Data
    static getSearchData() {
        return this.getTestDataFromJson('testdata/searchData.json');
    }

    // Track Order Data
    static getTrackOrderData() {
        return this.getTestDataFromJson('testdata/trackOrderData.json');
    }

    // Product Data
    static getProductData() {
        return this.getTestDataFromJson('testdata/productData.json');
    }

}