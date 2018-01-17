'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

//Step 1 - Euro-Volume and Step 2 - Send more, pay less
function getPrices(index,type){
  var price = 0;
  for (var i = 0; i < truckers.length; i++) {
    if(truckers[i].id === deliveries[index].truckerId){
      price = truckers[i][type];
    }
  }
  return price;
}

function calculateShippingPrice(){
  for (var i = 0; i < deliveries.length; i++) {
    var distance_price = getPrices(i,"pricePerKm");
    var volume_price = getPrices(i,"pricePerVolume");
    //console.log(deliveries[i].volume);
    if(5 <= deliveries[i].volume && deliveries[i].volume < 10){
      volume_price = volume_price - 0.1*volume_price;
    } if(10 <= deliveries[i].volume && deliveries[i].volume < 25){
      volume_price = volume_price - 0.3*volume_price;
    } if(deliveries[i].volume >= 25){
      volume_price = volume_price - 0.5*volume_price;
    }

    deliveries[i].price = deliveries[i].distance * distance_price + deliveries[i].volume * volume_price;
  }
}

//Step 3 - Give me all your money and Step 4 - The famous deductible
function calculateCommission(){
  for (var i = 0; i < deliveries.length; i++) {
    var commission_price = 0.3 * deliveries[i].price;
    var insurance_fee = 0.5 * commission_price;
    var treasury_fee = Math.trunc(deliveries[i].distance / 500);
    var convargo_benefit = commission_price - insurance_fee - treasury_fee;
    if(deliveries[i].options.deductibleReduction === true){
      convargo_benefit += deliveries[i].volume;
      deliveries[i].price += deliveries[i].volume;
    }
    //console.log(Math.trunc(treasury_fee)); 
    //console.log(convargo_benefit);
    deliveries[i].commission.insurance = insurance_fee;
    deliveries[i].commission.treasury = treasury_fee;
    deliveries[i].commission.convargo = convargo_benefit;
  }
}

//Step 5 - Pay the actors
function payActors(){
  for (var i = 0; i < deliveries.length; i++) {
    for (var j = 0; j < actors[i].payment.length; j++) {
      switch (actors[i].payment[j].who) {
        case 'shipper':
          actors[i].payment[j].amount = deliveries[i].price;
          break;
        case 'trucker':
          actors[i].payment[j].amount = deliveries[i].price - deliveries[i].commission.insurance - deliveries[i].commission.treasury - deliveries[i].commission.convargo;
          break;
        case 'insurance':
          actors[i].payment[j].amount = deliveries[i].commission.insurance;
          break;
        case 'treasury':
          actors[i].payment[j].amount = deliveries[i].commission.treasury;
          break;
        case 'convargo':
          actors[i].payment[j].amount = deliveries[i].commission.convargo;
          break;
        }
    }
  }
} 

calculateShippingPrice();
calculateCommission();
payActors();

console.log(truckers);
console.log(deliveries);
console.log(actors);