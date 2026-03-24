import { Page, Locator, expect } from '@playwright/test';

export class CartPage {

    private readonly page: Page;

    //  Locators
    private readonly cartItems: Locator;
    private readonly productNames: Locator;
    private readonly productPrices: Locator;
    private readonly productQuantity: Locator;
    private readonly btnRemove: Locator;
    private readonly totalPrice: Locator;
    private readonly emptyCartMsg: Locator;
    private readonly btnCheckout: Locator;

    //  Constructor
    constructor(page: Page) {
        this.page = page;

        this.cartItems = page.locator('.cart-item, .woocommerce-cart-form__cart-item');
        this.productNames = page.locator('.product-name a');
        this.productPrices = page.locator('.product-price');
        this.productQuantity = page.locator('input.qty');
        this.btnRemove = page.locator('.remove');
        this.totalPrice = page.locator('.order-total, .cart-total');
        this.emptyCartMsg = page.locator('text=Your cart is empty');
        this.btnCheckout = page.locator('a:has-text("Checkout"), button:has-text("Checkout")');
    }

    //  Actions

    async isCartPageLoaded() {
        await expect(this.page).toHaveURL(/cart/);
        return true;
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

    async updateQuantity(index: number, qty: number) {
        const qtyField = this.productQuantity.nth(index);
        await qtyField.fill(qty.toString());
        await qtyField.press('Enter');
    }

    async removeItem(index: number) {
        await this.btnRemove.nth(index).click();
    }

    async clickCheckout() {
        await this.btnCheckout.click();
    }

    //  Validations

    async validateCartNotEmpty() {
        await expect(this.cartItems.first()).toBeVisible();
    }

    async validateEmptyCart() {
        await expect(this.emptyCartMsg).toBeVisible();
    }

    async validateTotalPriceVisible() {
        await expect(this.totalPrice).toBeVisible();
    }

}