import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { DataProvider } from '../utils/DataProvider';
import { RandomDataUtil } from '../utils/RandomDataGenerator';

test.describe(' Search Functionality @regression @search', () => {

    test('Search with valid product @smoke', async ({ page }) => {
        const home = new HomePage(page);
        const data = DataProvider.getSearchData();

        await page.goto('https://sparklecartonline.com/');
        await home.searchProduct(data.validSearch);

        await expect(page).toHaveURL(/search|product/);
    });

    test('Search with invalid product @negative', async ({ page }) => {
        const home = new HomePage(page);

        await page.goto('https://sparklecartonline.com/');
        await home.searchProduct(RandomDataUtil.getInvalidSearch());

        // Validate no result scenario
        await expect(page.locator('body')).toContainText('No');
    });

});