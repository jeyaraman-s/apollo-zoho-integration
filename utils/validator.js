function isRequestAllowed(rateLimitDoc) {
    const now = new Date();
    const lastRequest = new Date(rateLimitDoc["last-request"]);

    const minutesSinceLastRequest = (now - lastRequest) / 60000;

    const minuteLeft = parseInt(rateLimitDoc["X-Minute-Requests-Left"], 10);
    const hourLeft = parseInt(rateLimitDoc["X-Hourly-Requests-Left"], 10);
    const dayLeft = parseInt(rateLimitDoc["X-24-Hour-Requests-Left"], 10);

    const enoughTimePassed = minutesSinceLastRequest >= 1;
    const hasQuota = minuteLeft > 0 && hourLeft > 0 && dayLeft > 0;

    return {
        allowed: enoughTimePassed && hasQuota,
        details: {
            minutesSinceLastRequest: parseFloat(minutesSinceLastRequest.toFixed(2)),
            readableTimeSinceLastRequest: formatDuration(minutesSinceLastRequest),
            minuteLeft,
            hourLeft,
            dayLeft
        }
    };
}

function formatDuration(minutes) {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = Math.floor(minutes % 60);
    return `${days}d ${hours}h ${mins}m ago`;
}

module.exports = isRequestAllowed;
