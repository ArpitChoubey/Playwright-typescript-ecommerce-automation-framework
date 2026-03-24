import { faker } from '@faker-js/faker';

export class RandomDataUtil {

    //  User डेटा (Registration / Login)

    static getFirstName(): string {
        return faker.person.firstName();
    }

    static getLastName(): string {
        return faker.person.lastName();
    }

    static getFullName(): string {
        return `${this.getFirstName()} ${this.getLastName()}`;
    }

    static getEmail(): string {
        return faker.internet.email().toLowerCase();
    }

    static getPassword(): string {
        return faker.internet.password({ length: 10, memorable: true });
    }

  

    static getAddress(): string {
        return faker.location.streetAddress();
    }

    static getCity(): string {
        return faker.location.city();
    }

    static getPincode(): string {
        return faker.location.zipCode('######');
    }

    //  Search / Product Data

    static getRandomProduct(): string {
        const products = [
            "Laptop",
            "Makeup Kit",
            "Kitchen Set",
            "Table",
            "Chair"
        ];
        return products[Math.floor(Math.random() * products.length)];
    }

    static getInvalidSearch(): string {
        return faker.string.alphanumeric(10);
    }

    //  Cart / Quantity

    static getQuantity(): number {
        return faker.number.int({ min: 1, max: 5 });
    }

    //  Track Order

    static getTrackingNumber(): string {
        return faker.string.numeric(9); // e.g. 123456789
    }

    static getInvalidTrackingNumber(): string {
        return faker.string.alphanumeric(12);
    }

    //  Misc (future use for checkout)

    static getRandomPrice(): string {
        return `$${faker.number.int({ min: 100, max: 2000 })}`;
    }

}