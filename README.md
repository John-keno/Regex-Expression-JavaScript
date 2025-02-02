# Regex-Expression-JavaScript

This repo demostrates the use of regex exxpression for validation. Here are the explanation of used regex expessions in the demo console app:

## Mastercard Regex Expression explaination

```JavaScript
const mastercardRegex = /^(5[1-5][0-9]{2}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4})$/;
```

  Mastercard regex expression above is used to validate Mastercard credit and debit cards. The Mastercard is 16 digits long and starts with 51-55. This is achieved using this expression and it means:

+ `^` -> This asserts the position at the start of the string.
+ `5` -> This matches the digit 5 showing that mastercard numbers starts with 5.
+ `[1-5]` -> This matches any digit from 1 to 5. So the second digit must be 1 to 5.
+ `[0-9]{2} -> This matches exactly 2 digits ranging from 0 to 9.
+ `\s?` -> This matches an optional space that is 0 or 1 space.
+ `[0-9]{4} -> This matches exactly 4 digits ranging rom 0 to 9. This pattern is repeated to cover the remaining segments of the card number.
+ `$` -> Asserts the position at the end of the string.

## Visa Card Regex Expression explanation

```JavaScript
const visaCardRegex = /^(4[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4})$/;
```

Visa card regex expression above is used to validate Visa card credit and debit cards. The Visa card is 16 digits long and starts with 4. This is achieved using this expression and it means:

+ `^` -> This asserts the position at the start of the string.
+ `4` -> This matches the digit 4 showing that Visa card numbers starts with 4.
+ `[0-9]{3}` -> This matches exactly 3 digits ranging from 0 to 9.
+ `\s?` -> This matches an optional space that is 0 or 1 space.
+ `[0-9]{4} -> This matches exactly 4 digits ranging rom 0 to 9. This pattern is repeated to cover the remaining segments of the card number.
+ `$` -> Asserts the position at the end of the string.

## Verve Card Regex Expression Explanation

```JavaScript
#verveCardRegex =
/^(5061|6500|5078|5079|5080)\s?[0-9]{4}\s?[0-9]{4}\s?[0-9]{4}(?:\s?[0-9]{3})?$/;
```
Verve card regex expression above is used to validate Verve card debit cards only. The Verve Usually starts with digits like 5061, 6500, 5078, 5079 or 5080 and its 16 to 19 digits long. This was achived using this expression and it means:

+ `^` -> This asserts the position at the start of the string.
+ `(5061|6500|5078|5079|5080)` -> This matches one of the specified prfixes which are 5061, 6500, 5078, 5079 and 5080.
+ `\s?` -> This matches an optional space that is 0 or 1 space.
+ `[0-9]{4}` -> This matches exactly 4 digits ranging from 0 to 9. This pattern repeats to cover the remaining segments of the card number.
+ `(?:\s?[0-9]{3})?` -> This non-capturing group matches an optional space followed by 3 digits ranging from o to 9 and occurring 0 or 1 time. This shows the extra 3 digit segment that may appear in Verve card numbers.
+ `$` -> Asserts the position at the end of the string.

## Expiry Date Regex Expression Explanation

```JavaScript
const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
```
All referenced cards have same format for expiration of the card and this was achieved using the expression above:

+ `^` -> This asserts the position at the start of the string.
+ `(0[1-9]|1[0-2])`-> This matches the month segment of the expiration date. `0[1-9]` matches 0 followed by any digit ranging from 1 to 9. This `|` acts as an OR operator. `0[0-2]` matches a month number from 10 to 12. the digit 1 is followed by any digit from 0 to 2. This together ensures that the month segment is valid ranging 01 to 12.
+ `\/?` -> This matches an optional forward slash that is 0 or 1 forward slash.
+ `([0-9]{2})` -> This matches exactly 2 digits ranging from 0 to 9. This represents the year in two digit format.
+ `$` -> Asserts the position at the end of the string.

## CVV Regex Expression Explanation

```JavaScript
cvvRegex = /^[0-9]{3}$/;
```

The CVV regex expression above is used to validate the CVV of the card. The CVV is 3 digit long in all cards used in the demo app. Here is the expression explanation:

+ `^` -> This asserts the position at the start of the string.
+ `[0-9]{3}` -> This matches exactly 3 digits ranging from 0 to 9.
+ `$` -> Asserts the position at the end of the string.
