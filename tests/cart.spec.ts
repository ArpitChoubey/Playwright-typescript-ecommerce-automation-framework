import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RandomDataUtil } from '../utils/RandomDataGenerator';

test.describe('🛒 Cart Functionality @regression @cart', () => {

    test('Add product to cart @smoke', async ({ page }) => {
        const home = new HomePage(page);

        await page.goto('https://sparklecartonline.com/');

        // Click first product
        await home.clickProductByIndex(0);

        // Add to cart (generic locator)
        await page.locator('button:has-text("Add to cart")').click();

        // Validate cart icon updated or message shown
        await expect(page.locator('body')).toContainText('cart');
    });

    test('Open cart page @sanity', async ({ page }) => {
        const home = new HomePage(page);

        await page.goto('https://sparklecartonline.com/');
        await home.clickCart();

        await expect(page).toHaveURL(/cart/);
    });

});