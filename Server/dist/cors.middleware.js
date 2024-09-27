"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cors = void 0;
const Cors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
};
exports.Cors = Cors;
//# sourceMappingURL=cors.middleware.js.map