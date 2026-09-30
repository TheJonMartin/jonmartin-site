/*
 * Google Analytics 4 — measurement IDs.
 *
 * Both Base layouts import this. If an ID is an empty string, NO analytics
 * script is emitted at all.
 *
 * Four Laws pages now live on thejonmartin.com (the old fourlaws subdomain
 * is a 301 splat). One data stream covers both layouts so a glossary →
 * writing → waitlist path is one session.
 */

/** thejonmartin.com — main layout (home, writing, hubspot-facing, etc.). */
export const GA_MAIN = 'G-5F47YFG0JW';

/** Four Laws layout on the same host. Same stream as GA_MAIN. */
export const GA_FOURLAWS = 'G-5F47YFG0JW';
