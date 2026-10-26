export const OFFER_END = '2026-10-25';
export const OFFER_NOW = 'HOY A SOLO $10';
export const OFFER_DAY = 'último día';
export const OFFER_WAS = '$99';
export const OFFER_PRICE = '$10';

export function mexicoDay(date = new Date()) {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Mexico_City',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
}

export function offerIsLive(date = new Date()) {
    return mexicoDay(date) <= OFFER_END;
}
