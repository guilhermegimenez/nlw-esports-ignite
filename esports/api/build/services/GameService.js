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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class GameService {
    // async create() {
    //     const game = await prisma.game.create({
    //         data: {
    //             id: Date.now().toString(),
    //             title: 'title Teste',
    //             bannerUrl: 'bannerTeste'
    //         }
    //     })
    //     return game;
    // }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield prisma.game.findMany({
                include: {
                    _count: {
                        select: { ads: true }
                    }
                }
            });
            return games;
        });
    }
    createAd(gameId, ad) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.ad.create({
                data: {
                    gameId,
                    name: ad.name,
                    yearsPlaying: ad.yearsPlaying,
                    discord: ad.discord,
                    weekDays: ad.weekDays,
                    hourStart: ad.hourStart,
                    hourEnd: ad.hourEnd,
                    useVoiceChannel: ad.useVoiceChannel
                }
            });
        });
    }
}
exports.default = new GameService();
//# sourceMappingURL=GameService.js.map