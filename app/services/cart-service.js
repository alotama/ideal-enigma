import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CartServiceService extends Service {
    @tracked unitsInCart = 0;
    @tracked totalPayable = 0;

    getUnitsInCart() {
        return this.unitsInCart;
    }

    getTotalPayable() {
        return this.totalPayable;
    }

    plusTotalPayable(price) {
        this.unitsInCart++
        const actualPrice = this.totalPayable + price;
        this.totalPayable = parseFloat(actualPrice.toFixed(2));
    }

    decreceTotalPayable(price) {
        this.unitsInCart--
        this.totalPayable = this.totalPayable - price
    }

    addUnitsInCart() {
        this.unitsInCart++;
    }
    
    decrementUnits() {
        this.unitsInCart--;
    }
}
