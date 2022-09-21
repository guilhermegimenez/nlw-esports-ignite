
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

        if (games.length > 0) {
            return games;
        } else {
            await prisma.game.createMany({
                data: [
                    { title: 'CS:GO', bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-285x380.jpg' },
                    { title: 'WOW', bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/18122-285x380.jpg' },
                    { title: 'VALORANT', bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg' },
                    { title: 'Dota 2', bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg' },
                    { title: 'Warzone', bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/512710-285x380.jpg' },
                    { title: 'Tibia', bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/19619_IGDB-144x192.jpg' }
                ]
            })
            return await prisma.game.findMany({
                include: {
                    _count: {
                        select: { ads: true }
                    }
                }
            })
        }

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