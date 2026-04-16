"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePublicReference = generatePublicReference;
function generatePublicReference(prefix = 'MO') {
    const random = Math.random().toString(36).slice(2, 8).toUpperCase();
    const time = Date.now().toString().slice(-6);
    return `${prefix}-${time}${random}`;
}
//# sourceMappingURL=generate-public-reference.js.map