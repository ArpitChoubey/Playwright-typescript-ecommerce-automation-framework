import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DataProvider } from '../utils/DataProvider';
import { RandomDataUtil } from '../utils/RandomDataGenerator';

let page: Page;
let home: HomePage;
let searchData: any;

test.describe(' Home Page Tests @smoke @ui @regression', () => {

    //  beforeAll → Runs once before all tests
    test.beforeAll(async ({ browser }) => {
        searchData = DataProvider.getSearchData();

        page = await browser.newPage();
        home = new HomePage(page);
    });

    //  beforeEach → Runs before each test
    test.beforeEach(async () => {
        await page.goto('https://sparklecartonline.com/');
    });

    //  afterEach → Runs after each test
    test.afterEach(async () => {
        console.log(' Test completed');
    });

    // afterAll → Runs once after all tests
    test.afterAll(async () => {
        await page.close();
    });

    // ================= TEST CASES ================= //

    test('Verify homepage loads successfully @smoke', async () => {
        const isLoaded = await home.isHomePageLoaded();
        expect(isLoaded).toBeTruthy();
    });

    test('Verify navigation menu links @regression', async () => {

        await home.clickShopAll();
        await expect(page).toHaveURL(/shop/);

        await page.goBack();

        await home.clickFAQs();
        await expect(page).toHaveURL(/faq|faqs/);

        await page.goBack();

        await home.clickContact();
        await expect(page).toHaveURL(/contact/);
    });

    test('Verify banner text @ui', async () => {
        await home.validateBannerText('Browse our latest products');
    });

    test('Verify search with valid product @smoke @search', async () => {
        await home.searchProduct(searchData.validSearch);
        await expect(page).toHaveURL(/search|product/);
    });

    test('Verify search with invalid product @negative', async () => {
        const invalidProduct = RandomDataUtil.getInvalidSearch();

        await home.searchProduct(invalidProduct);
        await expect(page.locator('body')).toContainText('No');
    });

    test('Verify product listing count @sanity', async () => {
        const count = await home.getProductCount();
        expect(count).toBeGreaterThan(0);
    });

});