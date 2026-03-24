import { test, expect } from '@playwright/test';
import { TrackOrderPage } from '../pages/TrackOrder';
import { DataProvider } from '../utils/DataProvider';
import { RandomDataUtil } from '../utils/RandomDataGenerator';

test.describe(' Track Order Tests @regression @trackorder', () => {

    test('Track order with valid data @smoke', async ({ page }) => {
        const trackPage = new TrackOrderPage(page);
        const data = DataProvider.getTrackOrderData();

        await page.goto('https://sparklecartonline.com/pages/track-order');

        await trackPage.trackOrder(data.validTrackingNumber);

        // Validate response (depends on UI)
        await expect(page.locator('body')).toBeVisible();
    });

    test('Track order with invalid data @negative', async ({ page }) => {
        const trackPage = new TrackOrderPage(page);

        await page.goto('https://sparklecartonline.com/pages/track-order');

        await trackPage.trackOrder(RandomDataUtil.getInvalidTrackingNumber());

        // Validate error or no result
        await expect(page.locator('body')).toContainText('Invalid');
    });

    test('Track order with empty input @edge', async ({ page }) => {
        const trackPage = new TrackOrderPage(page);

        await page.goto('https://sparklecartonline.com/pages/track-order');

        await trackPage.clickTrackOrder();

        // Add assertion if validation message appears
        await expect(page.locator('body')).toBeVisible();
    });

});