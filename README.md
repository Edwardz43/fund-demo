# Fund Demo

A demonstration of the mutual fund system with the [tsoa](https://tsoa-community.github.io/docs/introduction.html)
framework, which is.

## User Story

Buy a mutual fund from a bank

## Prerequisite and basic knowledge

* User has an bank account in the mutual fund selling bank
* This account provide enough info including:
    * Bank account to debit the money for buying the target mutual fund
    * An agreement signed by user to authorize the bank to debit
* The mutual fund listed for buying must provide enough info including
    * Fund name
    * Newest NAV(Net Assets Value) pre unit of the mutual fund
    * Fund type: Type A, B, C…, all about how to charge the trading fee
    * Prospectus for the listed mutual funds provided the basic information for each funds
    * Currency to calculate the NAV. it’s also the price to buy it (ex. In USD, EUD, NTD etc.)
* The price of a mutual fund is represented in its net assets value (NAV). The calculation of NAV will take a lot of
  time, so it cannot be provided instantly. Generally one, two or even three days are required.

## Buy a mutual fund through your bank

* Hank has an account in his bank
* He has signed a agreement for buying mutual funds the bank listed
* Some day, he decided to invest some money in some potential targets. He thinks mutual funds are good enough for him.
* He logins to his web bank account of the bank, takes some times to view the listed mutual funds.
* He decided to buy Fund ABC (USD), Type A. It’s a global stocks fund and the newest NAV is $34.62. The trading fee is
  1.5%. Type A means to prepay the trading fee while the trade made. He want to invest $100 in this fund.
* He pushed the purchase button, but the closing hours had passed. (It’s 14:00 CST for the bank.) So there’s a warning
  popped up, told him this order will be processed in the next trading date.
* The day after three days of the actual trading date, he received an email to notify him that the trade is made. The
  NAV of the mutual fund in the trade date is $35.412. Now he owned 2.8239 units of the mutual fund ABC in his mutual
  fund account. Now the balance of his bank account is decreased by $101.5.

## Considerations

* Generally, if the balance of his bank account is lower than required on the trade date, then the order for buying the
  mutual fund will fail. And Hank will receive an email to notify him about the result.
* Since the debit account is also his bank account of the bank he is buying the mutual fund. Then it’s possible to
  notify the user while he wants to buy the fund but his account balance is lower than required.

---

## Usage

```
# generate openapi spec
tsoa spec

# generate routes
tsoa routes

# build
yarn build

# run app
yarn start

```

Open the browser with http://localhost:3000/docs and the openapi UI will display.
