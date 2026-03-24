import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {

    private readonly page: Page;

    //  Locators
    private readonly searchResults: Locator;
    private readonly productTitles: Locator;
    private readonly noResultsMessage: Locator;
    private readonly searchInput: Locator;

    //  Constructor
    constructor(page: Page) {
        this.page = page;

        this.searchResults = page.locator('.product, .product-item');
        this.productTitles = page.locator('.product-title, .woocommerce-loop-product__title');
        this.noResultsMessage = page.locator('text=No products found, text=No results');
        this.searchInput = page.locator('input[type="search"]');
    }

    //  Actions

    async isSearchPageLoaded() {
        await expect(this.page).toHaveURL(/search|product/);
        return true;
    }

    async getSearchResultsCount(): Promise<number> {
        return await this.searchResults.count();
    }

    async clickProduct(index: number) {
        await this.searchResults.nth(index).click();
    }

    async searchAgain(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');
    }

    //  Validations

    async validateResultsVisible() {
        await expect(this.searchResults.first()).toBeVisible();
    }

    async validateNoResults() {
        await expect(this.noResultsMessage).toBeVisible();
    }

    async getProductTitles(): Promise<string[]> {
        return await this.productTitles.allTextContents();
    }

}