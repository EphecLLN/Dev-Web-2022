/* eslint-disable prefer-arrow-callback */
const pactum = require("pactum")
const {Given, When, Then, Before} = require("@cucumber/cucumber")

let spec = pactum.spec()

Before(() => {
  // FIXME: leverage ../[..]/server/env.js
  pactum.request.setBaseUrl("http://localhost:8080")
  spec = pactum.spec()
})

Given("the following users exist:", function (dataTable) {
  return "pending"
})

Given("I make a {word} request to {string}", function (method, url) {
  spec.withMethod(method)
  spec.withPath(url)
})

When("I receive a response", async function () {
  await spec.toss()
  this.response = spec.response()
})

Then("request is successfull", function () {
  spec.response().to.have.json({sucess: true})
})

Then("request is failed", function () {
  spec.response().to.have.json({sucess: false})
})

Then("response has status {int}", function (status) {
  spec.response().to.have.status(status)
})

Then("response data is:", function (dataTable) {
  return "pending"
})

Then("response has no data attached", function (dataTable) {
  return "pending"
})
