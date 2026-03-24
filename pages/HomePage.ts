import { Page, Locator, expect } from '@playwright/test';

export class HomePage {

    private readonly page: Page;

    // 🔹 Locators
    private readonly lnkHome: Locator;
    private readonly lnkShopAll: Locator;
    private readonly lnkFAQs: Locator;
    private readonly lnkTrackOrder: Locator;
    private readonly lnkContact: Locator;

    private readonly txtSearchBox: Locator;
    private readonly btnSearch: Locator;

    private readonly iconProfile: Locator;
    private readonly iconCart: Locator;

    private readonly bannerText: Locator;
    private readonly productCards: Locator;

    // 🔹 Constructor
    constructor(page: Page) {
        this.page = page;

        // Navigation links
        this.lnkHome = page.locator('a:has-text("Home")');
        this.lnkShopAll = page.locator('a:has-text("Shop All")');
        this.lnkFAQs = page.locator('a:has-text("FAQs")');
        this.lnkTrackOrder = page.locator('a:has-text("Track Order")');
        this.lnkContact = page.locator('a:has-text("Contact")');

        // Search
        this.txtSearchBox = page.locator('input[type="search"], input[placeholder*="Search"]');
        this.btnSearch = page.locator('button:has-text("Search"), button[type="submit"]');

        // Icons
        this.iconProfile = page.locator('a[href*="account"], svg[class*="user"]');
        this.iconCart = page.locator('a[href*="cart"], svg[class*="cart"]');

        // Banner & Products
        this.bannerText = page.locator('text=Browse our latest products');
        this.productCards = page.locator('.product, .product-item, .card');
    }

    //  Action Methods

    // Check if Home Page is loaded
    async isHomePageLoaded() {
        await expect(this.page).toHaveURL(/sparklecartonline/);
        return await this.bannerText.isVisible();
    }

    // Click Navigation Links
    async clickHome() {
        await this.lnkHome.click();
    }

    async clickShopAll() {
        await this.lnkShopAll.click();
    }

    async clickFAQs() {
        await this.lnkFAQs.click();
    }

    async clickTrackOrder() {
        await this.lnkTrackOrder.click();
    }

    async clickContact() {
        await this.lnkContact.click();
    }

    // Search Product
    async searchProduct(productName: string) {
        await this.txtSearchBox.fill(productName);
        await this.txtSearchBox.press('Enter'); // more reliable than button
    }

    // Click Profile Icon
    async clickProfile() {
        await this.iconProfile.click();
    }

    // Click Cart Icon
    async clickCart() {
        await this.iconCart.click();
    }

    // Get number of products displayed
    async getProductCount(): Promise<number> {
        return await this.productCards.count();
    }

    // Click product by index
    async clickProductByIndex(index: number) {
        await this.productCards.nth(index).click();
    }

    // Validate banner text
    async validateBannerText(expectedText: string) {
        await expect(this.bannerText).toHaveText(expectedText);
    }

}