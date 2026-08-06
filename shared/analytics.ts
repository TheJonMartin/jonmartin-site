/*
 * Google Analytics 4 — measurement IDs for both sites.
 *
 * Both Base layouts import this. If an ID is an empty string, NO analytics
 * script is emitted at all, so the site stays script-free until you're ready.
 * That's the deliberate default: shipping a broken GA tag is worse than
 * shipping none.
 *
 * TO TURN IT ON
 *   1. In Google Analytics, create one GA4 property with two data streams —
 *      one for thejonmartin.com, one for fourlaws.thejonmartin.com. Two streams
 *      in ONE property, not two properties: that's what lets you see a reader
 *      go from the Four Laws glossary to the waitlist as a single journey,
 *      which is the whole reason you're installing this.
 *   2. Paste each stream's Measurement ID (format: G-XXXXXXXXXX) below.
 *   3. In GA4 → Admin → Data Streams → Configure tag settings → "Configure your
 *      domains", add both domains so cross-domain traffic isn't counted as a
 *      new session with a referral.
 *
 * ONE THING TO KNOW BEFORE YOU DO
 *   GA4 sets cookies. Both sites currently set none, which is why neither has a
 *   cookie banner. Turning this on gives you a consent obligation for visitors
 *   in the UK/EU (and, depending on how you read it, some US states). Options:
 *     - Accept it and add a consent banner (real work, and it'll be the only
 *       piece of interactive chrome on an otherwise static site).
 *     - Set GA4 to "Consent Mode" with analytics_storage denied by default —
 *       you get modelled traffic without cookies, no banner needed.
 *     - Use a cookieless tracker instead and skip the whole question.
 *   Flagged because it's the one item on the audit list that makes the site
 *   legally more complicated rather than less.
 */

/** thejonmartin.com — e.g. 'G-ABC1234567'. Empty string disables analytics. */
export const GA_MAIN = '';

/** fourlaws.thejonmartin.com — e.g. 'G-DEF7654321'. Empty string disables. */
export const GA_FOURLAWS = '';
