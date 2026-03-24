import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { CartPage } from '../pages/CartPage';
import { RandomDataUtil } from '../utils/RandomDataGenerator';

test.describe(' SparkleCart E2E Flow @smoke @e2e @regression', () => {

    test('Complete user journey: Search → Add to Cart → Validate Cart', async ({ page }) => {

        const home = new HomePage(page);
        const search = new SearchPage(page);
        const cart = new CartPage(page);

        //  Step 1: Open Application
        await page.goto('https://sparklecartonline.com/');

        //  Step 2: Verify Home Page Loaded
        const isHomeLoaded = await home.isHomePageLoaded();
        expect(isHomeLoaded).toBeTruthy();

        //  Step 3: Search Product
        const product = RandomDataUtil.getRandomProduct();
        await home.searchProduct(product);

        //  Step 4: Validate Search Results
        await search.validateResultsVisible();

        const resultCount = await search.getSearchResultsCount();
        expect(resultCount).toBeGreaterThan(0);

        //  Step 5: Click First Product
        await search.clickProduct(0);

        //  Step 6: Add Product to Cart
        const addToCartBtn = page.locator('button:has-text("Add to cart"), button:has-text("Add to Cart")');
        await addToCartBtn.click();

        // Optional wait for cart update (WooCommerce behavior)
        await page.waitForTimeout(2000);

        //  Step 7: Navigate to Cart
        await home.clickCart();

        //  Step 8: Validate Cart Page
        await cart.isCartPageLoaded();
        await cart.validateCartNotEmpty();

        const cartCount = await cart.getCartItemCount();
        expect(cartCount).toBeGreaterThan(0);

        //  Step 9: Validate Total Price
        await cart.validateTotalPriceVisible();

    });

});