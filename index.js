const express = require("express");
require("dotenv").config();
const axios = require("axios");
const app = express();

let currencyConversionRates = {
  success: true,
  timestamp: 1680722283,
  base: "USD",
  date: "2023-04-05",
  rates: {
    AED: 3.672596,
    AFN: 86.496617,
    ALL: 103.490094,
    AMD: 388.32053,
    ANG: 1.803447,
    AOA: 507.000022,
    ARS: 211.215298,
    AUD: 1.487996,
    AWG: 1.8,
    AZN: 1.647903,
    BAM: 1.787997,
    BBD: 2.020478,
    BDT: 107.519313,
    BGN: 1.793185,
    BHD: 0.377044,
    BIF: 2083,
    BMD: 1,
    BND: 1.326873,
    BOB: 6.941041,
    BRL: 5.056102,
    BSD: 1.000686,
    BTC: 0.000035583643,
    BTN: 82.038101,
    BWP: 13.063948,
    BYN: 2.525758,
    BYR: 19600,
    BZD: 2.017004,
    CAD: 1.346055,
    CDF: 2049.999555,
    CHF: 0.90619,
    CLF: 0.02944,
    CLP: 812.339835,
    CNY: 6.879497,
    COP: 4579.04,
    CRC: 538.190794,
    CUC: 1,
    CUP: 26.5,
    CVE: 101.470304,
    CZK: 21.483982,
    DJF: 177.720227,
    DKK: 6.83062,
    DOP: 54.750178,
    DZD: 135.3836,
    EGP: 30.897398,
    ERN: 15,
    ETB: 53.939982,
    EUR: 0.91681,
    FJD: 2.20125,
    FKP: 0.800078,
    GBP: 0.80257,
    GEL: 2.555022,
    GGP: 0.800078,
    GHS: 10.750213,
    GIP: 0.800078,
    GMD: 62.249887,
    GNF: 8649.999778,
    GTQ: 7.802715,
    GYD: 211.673593,
    HKD: 7.8499,
    HNL: 24.595036,
    HRK: 7.018274,
    HTG: 154.600722,
    HUF: 344.929892,
    IDR: 14972.8,
    ILS: 3.58466,
    IMP: 0.800078,
    INR: 81.95105,
    IQD: 1461,
    IRR: 42250.000015,
    ISK: 137.120025,
    JEP: 0.800078,
    JMD: 152.214655,
    JOD: 0.7094,
    JPY: 131.160501,
    KES: 133.393234,
    KGS: 87.420587,
    KHR: 4058.999797,
    KMF: 451.170194,
    KPW: 899.929613,
    KRW: 1317.139728,
    KWD: 0.306803,
    KYD: 0.833935,
    KZT: 449.138364,
    LAK: 17169.999714,
    LBP: 15265.00047,
    LKR: 322.607304,
    LRD: 162.449956,
    LSL: 17.990232,
    LTL: 2.95274,
    LVL: 0.60489,
    LYD: 4.755025,
    MAD: 10.199498,
    MDL: 18.214901,
    MGA: 4360.000186,
    MKD: 56.323993,
    MMK: 2101.385016,
    MNT: 3525.373174,
    MOP: 8.091875,
    MRO: 356.999828,
    MUR: 45.398647,
    MVR: 15.369532,
    MWK: 1022.495535,
    MXN: 18.319645,
    MYR: 4.398503,
    MZN: 63.250217,
    NAD: 17.990314,
    NGN: 464.491092,
    NIO: 36.549732,
    NOK: 10.453603,
    NPR: 131.239201,
    NZD: 1.58357,
    OMR: 0.384975,
    PAB: 1.000686,
    PEN: 3.768969,
    PGK: 3.525026,
    PHP: 54.504022,
    PKR: 288.249673,
    PLN: 4.29706,
    PYG: 7167.3447,
    QAR: 3.640986,
    RON: 4.521502,
    RSD: 107.504981,
    RUB: 80.200188,
    RWF: 1107,
    SAR: 3.751686,
    SBD: 8.28728,
    SCR: 13.906234,
    SDG: 599.999655,
    SEK: 10.409445,
    SGD: 1.328405,
    SHP: 1.21675,
    SLE: 21.405782,
    SLL: 19749.99995,
    SOS: 569.500592,
    SRD: 36.471018,
    STD: 20697.981008,
    SVC: 8.756228,
    SYP: 2512.448917,
    SZL: 17.989755,
    THB: 33.939753,
    TJS: 10.93934,
    TMT: 3.51,
    TND: 3.041963,
    TOP: 2.343943,
    TRY: 19.25492,
    TTD: 6.782466,
    TWD: 30.558102,
    TZS: 2340.000186,
    UAH: 36.945651,
    UGX: 3772.912191,
    USD: 1,
    UYU: 38.606756,
    UZS: 11374.999951,
    VEF: 2443957.304845,
    VES: 24.410861,
    VND: 23467.5,
    VUV: 118.157759,
    WST: 2.707093,
    XAF: 599.716597,
    XAG: 0.040054,
    XAU: 0.000494,
    XCD: 2.70255,
    XDR: 0.743521,
    XOF: 598.495715,
    XPF: 109.74954,
    YER: 250.349753,
    ZAR: 18.042795,
    ZMK: 9001.224019,
    ZMW: 19.941663,
    ZWL: 321.999592,
  },
};

// update currency conversion rates on server start
axios
  .get("https://api.apilayer.com/exchangerates_data/latest?base=USD", {
    headers: { apikey: process.env.CONVERSION_API_KEY },
  })
  .then((response) => (currencyConversionRates = response.data));

// update currency conversion rates every 6 hours
setInterval(async () => {
  currencyConversionRates = await axios
    .get("https://api.apilayer.com/exchangerates_data/latest?base=USD", {
      headers: { apikey: process.env.CONVERSION_API_KEY },
    })
    .then((response) => response.data);
}, 6 * 3600000);

// get rates
app.get("/rates", async (req, res) => {
  const conversionRates = await axios
    .get("https://api.apilayer.com/exchangerates_data/latest?base=USD", {
      headers: { apikey: process.env.CONVERSION_API_KEY },
    })
    .then((response) => response.data);
  res.json(conversionRates);
});

// start converting non USD deals to USD
app.get("/start-conversion", async (req, res) => {
  const deals = await axios
    .get(
      "https://api.hubapi.com/crm/v3/objects/deals?properties=deal_currency_code,amount",
      {
        headers: {
          authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    )
    .then((response) => response.data);

  // find other currency deals
  const otherCurrencyDeals = deals.results.filter(
    (x) => x.properties.deal_currency_code !== "USD"
  );

  // update them one by one
  otherCurrencyDeals.forEach(async (x) => {
    await axios.get(`http://localhost:3000/convert/${x.id}`);
  });

  res.send(otherCurrencyDeals);
});

// get a specific deal info
app.get("/deals/:dealId", async (req, res) => {
  const dealId = req.params.dealId;
  const deal = await axios
    .get(
      `https://api.hubapi.com/crm/v3/objects/deals/${dealId}?properties=deal_currency_code,amount`,
      {
        headers: {
          authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    )
    .then((response) => response.data);
  res.json(deal);
});

// convert a specific deal to USD
app.get("/convert/:dealId", async (req, res) => {
  // get the currency code and amount of deal
  const dealId = req.params.dealId;
  const { deal_currency_code, amount } = await axios
    .get(
      `https://api.hubapi.com/crm/v3/objects/deals/${dealId}?properties=deal_currency_code,amount`,
      {
        headers: {
          authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    )
    .then((response) => response.data.properties);

  const hubspot = require("@hubspot/api-client");
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.API_KEY,
  });
  const properties = {
    amount: amount * (1 / currencyConversionRates.rates[deal_currency_code]),
    deal_currency_code: "USD",
  };
  const SimplePublicObjectInput = { properties };
  const idProperty = undefined;
  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.update(
      dealId,
      SimplePublicObjectInput,
      idProperty
    );
    console.log(JSON.stringify(apiResponse, null, 2));
    res.send("done");
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `Example app listening on port http://localhost:${process.env.PORT}`
  );
});
