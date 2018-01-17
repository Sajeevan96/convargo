# CONVARGO

> javascript workshop based on french startup https://www.convargo.com

![convargo](./convargo.png)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Introduction](#introduction)
- [Objectives](#objectives)
- [Just tell me what to do](#just-tell-me-what-to-do)
- [Don't forget:](#dont-forget)
- [Exercises](#exercises)
  - [Exercise 1 - Euro-Volume](#exercise-1---euro-volume)
    - [Shipping prices](#shipping-prices)
    - [Just tell me what to do](#just-tell-me-what-to-do-1)
  - [Exercise 2 - Send more, pay less](#exercise-2---send-more-pay-less)
    - [Decreasing pricing for high volumes](#decreasing-pricing-for-high-volumes)
    - [New price rules](#new-price-rules)
    - [Just tell me what to do](#just-tell-me-what-to-do-2)
  - [Exercise 3 - Give me all your money](#exercise-3---give-me-all-your-money)
    - [Commission](#commission)
    - [Just tell me what to do](#just-tell-me-what-to-do-3)
  - [Exercice 4 - The famous deductible](#exercice-4---the-famous-deductible)
    - [The deductible](#the-deductible)
    - [Just tell me what to do](#just-tell-me-what-to-do-4)
  - [Exercise 5 - Pay the actors](#exercise-5---pay-the-actors)
    - [The actors](#the-actors)
    - [Just tell me what to do](#just-tell-me-what-to-do-5)
  - [Exercise 6 - Rental modification](#exercise-6---rental-modification)
    - [New dates and distance](#new-dates-and-distance)
    - [Just tell me what to do](#just-tell-me-what-to-do-6)
- [Source](#source)
- [Licence](#licence)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

[Convargo](https://www.convargo.com/) wants to revolutionise the freight industry, by connecting shippers with truckers in real time via a web application.

The Goods freight transport sector is a key sector of the Europe (even worldwilde) economy:

* 300 billion euros in Europe
* 43 billion euros in France
* highly fragmented with more than 40,000 road transport companies in France
* under efficient: ⅓ trucks drive empty on Fance roads!

The [Convargo](https://www.youtube.com/watch?v=7hrDZluvtXo) platform allows shippers to:

* access directy to a wide range of road transport companies with available loading capacity
* compute and display the transport price calculated according to the best opportunities on the market at a time T
* track in real-time the goods delivery
* access to proof of transport and dematerialized invoices

## Objectives

We focus on this platform feature: `compute and display the transport price calculated according to the best opportunities on the market at a time T`.

The next exercises goals are to

1. compute the ship price for the `shippers`
2. compute the profit of the road transport company, the `truckers`
3. compute the commission of `convargo`

## Just tell me what to do

1. Fork the project via `github`
1. Clone the project `git clone https://github.com/YOUR_USERNAME/convargo`
1. Solve each exercises inside [./public/index.js](./public/index.js) file with JavaScript
1. Once the exercise is solved, commit something like `git add -A && git commit -m "feat(price): decrease pricing for longer rentals"` ([why following a convention?](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits))
1. 5 exercises, so ideally 5 commits
1. Don't forget to push before the end of the workshop
1. Check that your codebase works by opening [/public/index.html](./public/index.html) in your browser
1. Check the ouput in your browser console

### Don't forget:

* DRY - Don't repeat yourself
* DOT - Do One Thing
* KISS - Keep It Simple Stupid
* LIM - Less Is More
* English only: codebase, variables, comments...

**Focus only on coding, forgot the browser display (next workshop!).

Use `console.log` to display results (for the moment)**

## Exercises

### Exercise 1 - Euro-Volume

#### Shipping prices

The shipper books the trucker for an itinerary and volume.

The shipping price is the sum of the distance component and the volume component with

* **distance component**: the number of kilometers multiplied by the trucker price per km
* **volume component**: the used volume multiplied by the trucker price per m3

```
shipping price = distance + volume
```

#### Just tell me what to do

Write JS code that generates the shpping price for each `shipper` from `index.js` file:

```js
const deliveries = ...;
...
console.log(deliveries);

//example output from console.log
[
  {
    "id": "bba9500c-fd9e-453f-abf1-4cd8f52af377",
    ...
    "price": ?
  },
  {
    "id": "65203b0a-a864-4dea-81e2-e389515752a8",
    ...
    "price": ?
  },
  {
    "id": "165d65ec-5e3f-488e-b371-d56ee100aa58",
    ...
    "price": ?
  }
]
```

### Exercise 2 - Send more, pay less

#### Decreasing pricing for high volumes

To be as competitive as possible, convargo decide to have a decreasing pricing for high volumes.

#### New price rules

**price per m3**

* decreases by **10% after 5 m3**
* decreases by **30% after 10 m3**
* decreases by **50% after 25 m3**

#### Just tell me what to do

Adapt the shipping price computation to take these new rules into account.

```js
const deliveries = ...;
...
console.log(deliveries);

//example output from console.log
[
  {
    "id": "bba9500c-fd9e-453f-abf1-4cd8f52af377",
    ...
    "price": ?
  },
  {
    "id": "65203b0a-a864-4dea-81e2-e389515752a8",
    ...
    "price": ?
  },
  {
    "id": "165d65ec-5e3f-488e-b371-d56ee100aa58",
    ...
    "price": ?
  }
]
```

### Exercise 3 - Give me all your money

Now, it's time to pay the truckers

Convargo take a 30% commission on the shipping price to cover their costs.

#### Commission

The commission is split like this:

* **insurance**: half of commission
* **the Treasury**: 1€ by 500km range
* **convargo**: the rest

#### Just tell me what to do

Compute the amount that belongs to the insurance, to the assistance and to convargo.

```js
const deliveries = ...;
...
console.log(deliveries);


//example output from console.log
[
  {
    "id": "bba9500c-fd9e-453f-abf1-4cd8f52af377",
    ...
    "commission": {
      "insurance": ?,
      "treasury": ?
      "convargo": ?
    }
  },
  ...
]
```

### Exercice 4 - The famous deductible

In case of an accident/theft, convargo applies a 1000€ deductible.

The shipper can reduce the deductible amount from 1000€ to 200€ with a `deductible option` for a few more euros per volume.

#### The deductible

The driver is charged an additional 1€/m3 when he chooses the `deductible reduction` option.

**The additional charge goes to convargo, not to the trucker.**

#### Just tell me what to do

Compute the new amount price if the shipper subscribed to `deductible option`.

```js
const deliveries = ...;
...
console.log(rentals);

//example output from console.log
[
  {
    "id": "bba9500c-fd9e-453f-abf1-4cd8f52af377",
    'options': {
      'deductibleReduction': true
    },
    ...
    "price": ?
  },
  ...
]
```

### Exercise 5 - Pay the actors

#### The actors

It's time to debit/credit each actor!

- **the shipper** must pay the **shipping price** and the **(optional) deductible reduction**
- **the trucker** receives the **shipping price** minus the **commission**
- **the insurance** receives its part of the **commission**
- **the Treasury** receives its part of the tax **commission**
- **convargo receives** its part of the **commission**, plus the **deductible reduction**

#### Just tell me what to do

* Compute the debit for the `shipper`
* Compute the credit of the car `trucker`, `insurance`, and `convargo`.

```js
const actors = ...;
...
console.log(actors);

//example output from console.log
[
  {
    "deliveryId": "bba9500c-fd9e-453f-abf1-4cd8f52af377",
    "payment": [
      {
        "who": "shipper",
        "type": "debit",
        "amount": ?
      },
      {
        "who": "owner",
        "type": "credit",
        "amount": ?
      },
      {
        "who": "insurance",
        "type": "credit",
        "amount": ?
      },
      {
        "who": "treasury",
        "type": "credit",
        "amount": ?
      },
      {
        "who": "convargo",
        "type": "credit",
        "amount": ?
      }
    ]
  },
  ...
]
```

## Source and inspiration

[Convargo](https://www.convargo.com/)
[Drivy Challenges](https://github.com/drivy/jobs)

## Licence

[Uncopyrighted](http://zenhabits.net/uncopyright/)
