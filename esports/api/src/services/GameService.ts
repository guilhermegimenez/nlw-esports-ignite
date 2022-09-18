
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type Ad = {
    id: string
    idGame: string
    name: string
    weekDays: string
    discord: string
    useVoiceChannel: boolean
    yearsPlaying: number
    hourStart: number
    hourEnd: number
}

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

    async list() {
        const games = await prisma.game.findMany({
            include: {
                _count: {
                    select: { ads: true }
                }
            }
        })
        return games;
    }

    async createAd(gameId: string, ad: Ad) {
        return await prisma.ad.create({
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
        })
    }
}



export default new GameService();