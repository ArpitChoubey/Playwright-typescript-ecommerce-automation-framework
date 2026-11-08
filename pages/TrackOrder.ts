import { Page, Locator, expect } from '@playwright/test';

export class TrackOrderPage {

    private readonly page: Page;

    //  Header Navigation (Reusable)
    private readonly lnkHome: Locator;
    private readonly lnkShopAll: Locator;
    private readonly lnkFAQs: Locator;
    private readonly lnkTrackOrder: Locator;
    private readonly lnkContact: Locator;

    //  Track Order Elements
    private readonly txtTrackingInput: Locator;
    private readonly btnTrackOrder: Locator;
    private readonly pageTitle: Locator;
    private readonly pageSubtitle: Locator;

    //  Constructor
    constructor(page: Page) {
        this.page = page;

        // Navigation
        this.lnkHome = page.locator('a:has-text("Home")');
        this.lnkShopAll = page.locator('a:has-text("Shop All")');
        this.lnkFAQs = page.locator('a:has-text("FAQs")');
        this.lnkTrackOrder = page.locator('a:has-text("Track Order")');
        this.lnkContact = page.locator('a:has-text("Contact")');

        // Track Order Page Elements
        this.pageTitle = page.locator('text=Track Order');
        this.pageSubtitle = page.locator('text=Enter your tracking number');

        this.txtTrackingInput = page.locator('input[type="text"], input[placeholder*="tracking"]');
        this.btnTrackOrder = page.locator('button:has-text("TRACK ORDER"), button:has-text("Track Order")');
    }

    //  Page Validation

    async isTrackOrderPageLoaded() {
        await expect(this.page).toHaveURL(/track-order/);
        await expect(this.pageTitle).toBeVisible();
        return await this.txtTrackingInput.isVisible();
    }

    //  Actions

    async enterTrackingNumber(trackingNumber: string) {
        try {
            await this.txtTrackingInput.fill(trackingNumber);
        } catch (error) {
            console.log(`Exception while entering tracking number: ${error}`);
            throw error;
        }
    }

    async clickTrackOrder() {
        try {
            await this.btnTrackOrder.click();
        } catch (error) {
            console.log(`Exception while clicking Track Order button: ${error}`);
            throw error;
        }
    }

    async trackOrder(trackingNumber: string) {
        await this.enterTrackingNumber(trackingNumber);
        await this.clickTrackOrder();
    }

    // 🔹 Validations

    async validatePageContent() {
        await expect(this.pageTitle).toHaveText('Track Order');
        await expect(this.pageSubtitle).toContainText('tracking number');
    }

    async validateEmptyInputError() {
        // Generic validation (depends on site behavior)
        await this.clickTrackOrder();
        // Add assertion based on actual error message if visible
    }

    // 🔹 Navigation Methods

    async navigateToTrackOrder() {
        await this.lnkTrackOrder.click();
    }

    async clickHome() {
        await this.lnkHome.click();
    }

    async clickShopAll() {
        await this.lnkShopAll.click();
    }

    async clickContact() {
        await this.lnkContact.click();
    }

}