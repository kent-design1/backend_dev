import aj from "../arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });
        console.log("Arcjet decision", decision);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error: "Too Many Requests" });
            }

            if (decision.reason.isBot()) {
                return res.status(403).json({ error: "No bots allowed" });
            }

            return res.status(403).json({ error: "Access denied" });
        }

        // ✅ allowed → continue to the route
        return next();
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

export default arcjetMiddleware;