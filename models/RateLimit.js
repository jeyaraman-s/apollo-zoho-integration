const mongoose = require("mongoose");

const rateLimitSchema = new mongoose.Schema({
    "X-Rate-Limit-24-Hour": String,
    "X-24-Hour-Requests-Left": String,
    "X-Rate-Limit-Hourly": String,
    "X-Hourly-Requests-Left": String,
    "X-Rate-Limit-Minute": String,
    "X-Minute-Requests-Left": String,
    "last-request": Date
});

module.exports = mongoose.model("rate_limits", rateLimitSchema);
