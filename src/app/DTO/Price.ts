import { Currency } from "./Currency";

export class Price{
    id: number;
    value: number;
    currencies: Set<Currency>;
}