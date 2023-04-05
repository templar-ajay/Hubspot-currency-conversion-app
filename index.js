const express = require("express");
require("dotenv").config();
const axios = require("axios");
const app = express();

const currencyConversionRate = {
  USD: 1,
  INR: 0.012202314,
};

app.get("/rates", async (req, res) => {
  const conversionRates = await axios
    .get("https://api.apilayer.com/exchangerates_data/latest?base=USD", {
      headers: { apikey: process.env.CONVERSION_API_KEY },
    })
    .then((response) => response.data);
  res.send(conversionRates);
});

app.get("/", async (req, res) => {
  //  get all deals
  //   axios
  //     .get("https://api.hubapi.com/crm/v3/objects/deals", {
  //       headers: {
  //         authorization: `Bearer ${process.env.API_KEY}`,
  //       },
  //     })
  //     .then((response) => res.send(response.data));

  // Starting November 30, 2022, API keys will be sunset as an authentication method. Learn more about this change: https://developers.hubspot.com/changelog/upcoming-api-key-sunset and how to migrate an API key integration: https://developers.hubspot.com/docs/api/migrate-an-api-key-integration-to-a-private-app to use a private app instead.
  //   const hubspot = require("@hubspot/api-client");
  //   const hubspotClient = new hubspot.Client({
  //     accessToken: process.env.API_KEY,
  //   });
  //   const limit = 10;
  //   const after = undefined;
  //   const properties = undefined;
  //   const propertiesWithHistory = undefined;
  //   const associations = undefined;
  //   const archived = false;
  //   try {
  //     const apiResponse = await hubspotClient.crm.deals.basicApi.getPage(
  //       limit,
  //       after,
  //       properties,
  //       propertiesWithHistory,
  //       associations,
  //       archived
  //     );
  //     res.json(JSON.parse(JSON.stringify(apiResponse, null, 2)));
  //   } catch (e) {
  //     e.message === "HTTP request failed"
  //       ? console.error(JSON.stringify(e.response, null, 2))
  //       : console.error(e);
  //   }

  // get deal currency code

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

  //   // update them
  otherCurrencyDeals.forEach(async (x) => {
    await axios.get(`http://localhost:3000/update/${x.id}`);
  });

  res.send(otherCurrencyDeals);
});

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

app.get("/update/:dealId", async (req, res) => {
  // patch one deal
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

  // Starting November 30, 2022, API keys will be sunset as an authentication method. Learn more about this change: https://developers.hubspot.com/changelog/upcoming-api-key-sunset and how to migrate an API key integration: https://developers.hubspot.com/docs/api/migrate-an-api-key-integration-to-a-private-app to use a private app instead.
  const hubspot = require("@hubspot/api-client");
  const hubspotClient = new hubspot.Client({
    accessToken: process.env.API_KEY,
  });
  const properties = {
    amount: amount * currencyConversionRate[deal_currency_code],
    deal_currency_code: "USD",
    // closedate: "2019-12-07T16:50:06.678Z",
    // dealname: "Custom data integrations",
    // dealstage: "presentationscheduled",
    // hubspot_owner_id: "910901",
    // pipeline: "default",
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
