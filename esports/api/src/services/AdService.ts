
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class AdService {

    async listByGameId(gameId: string) {
        const ads = await prisma.ad.findMany({
            select: {
                id: true,
                name: true,
                weekDays: true,
                useVoiceChannel: true,
                yearsPlaying: true,
                hourStart: true,
                hourEnd: true
            },
            where: {
                gameId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return ads;
    }

    async findDiscordByAdId(id: string) {
        const ad = await prisma.ad.findUniqueOrThrow({
            select: {
                discord: true
            },
            where: {
                id
            }
        })
        return ad;
    }

}



export default new AdService();