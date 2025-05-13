const RateLimit = require("../models/RateLimit");
const isRequestAllowed = require("../utils/validator");

const checkRateLimit = async (req, res) => {
    try {
        const rateLimitDoc = await RateLimit.findOne().sort({ "last-request": -1 });

        if (!rateLimitDoc) {
            return res.status(404).json({
                message: "❌ No rate limit data found in the database.",
            });
        }

        const result = isRequestAllowed(rateLimitDoc);

        if (result.allowed) {
            return res.status(200).json({
                message: "✅ Allowed to send request to Apollo API.",
                details: result.details,
            });
        } else {
            return res.status(403).json({
                message: "⛔ Rate limit exceeded or not enough time passed",
                details: result.details,
            });
        }
    } catch (error) {
        console.error("❌ Error checking rate limits:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = checkRateLimit;
