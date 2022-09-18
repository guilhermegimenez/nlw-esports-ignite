"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const GameService_1 = __importDefault(require("./services/GameService"));
const AdService_1 = __importDefault(require("./services/AdService"));
const covert_hours_string_to_minutes_1 = require("./utils/covert-hours-string-to-minutes");
const convert_minutes_to_hours_string_1 = require("./utils/convert-minutes-to-hours-string");
const app = (0, express_1.default)();
// Use middleware to compress
app.use((0, compression_1.default)());
// Set to use json
app.use(express_1.default.json());
// Liberando cors
app.use((0, cors_1.default)());
app.get('/games', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json(yield GameService_1.default.list());
}));
// TODO - Validação npm zod
app.post('/games/:id/ads', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = String(req.params.id);
    let ad = req.body;
    ad.weekDays = ad.weekDays.join();
    ad.hourStart = (0, covert_hours_string_to_minutes_1.convertHoursStringtoMinutes)(ad.hourStart);
    ad.hourEnd = (0, covert_hours_string_to_minutes_1.convertHoursStringtoMinutes)(ad.hourEnd);
    return res.status(201).json(yield GameService_1.default.createAd(gameId, ad));
}));
app.get('/games/:id/ads', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.id;
    const ads = yield AdService_1.default.listByGameId(gameId);
    return res.status(200).json(ads.map(ad => {
        return Object.assign(Object.assign({}, ad), { weekDays: ad.weekDays.split(','), hourStart: (0, convert_minutes_to_hours_string_1.convertMinutesToHourString)(ad.hourStart), hourEnd: (0, convert_minutes_to_hours_string_1.convertMinutesToHourString)(ad.hourEnd) });
    }));
}));
app.get('/ads/:id/discord', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        return res.status(200).json(yield AdService_1.default.findDiscordByAdId(id));
    }
    catch (error) {
        return res.status(404).send("Ad Not Found");
    }
}));
app.listen(3030);
//# sourceMappingURL=api.js.map