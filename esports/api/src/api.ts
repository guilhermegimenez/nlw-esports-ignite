import express from "express";
import compression from "compression";
import cors from 'cors';
import gameService from "./services/GameService"
import adService from "./services/AdService"
import { convertHoursStringtoMinutes } from "./utils/covert-hours-string-to-minutes";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hours-string";

const app = express();

// Use middleware to compress
app.use(compression());
// Set to use json
app.use(express.json())
// Liberando cors
app.use(cors())


app.get('/games', async (req, res) => {
    return res.status(200).json(await gameService.list());
})

// TODO - Validação npm zod

app.post('/games/:id/ads', async (req, res) => {
    const gameId = String(req.params.id);
    let ad = req.body;
    ad.weekDays = ad.weekDays.join();
    ad.hourStart = convertHoursStringtoMinutes(ad.hourStart);
    ad.hourEnd = convertHoursStringtoMinutes(ad.hourEnd);

    try {
        return res.status(201).json(await gameService.createAd(gameId, ad));
    } catch (error) {
        return res.status(400).send("Invalid Game");
    }

})

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;
    const ads = await adService.listByGameId(gameId);

    return res.status(200).json(
        ads.map(ad => {
            return {
                ...ad,
                weekDays: ad.weekDays.split(','),
                hourStart: convertMinutesToHourString(ad.hourStart),
                hourEnd: convertMinutesToHourString(ad.hourEnd)
            }
        })
    );
});

app.get('/ads/:id/discord', async (req, res) => {
    try {
        const id = req.params.id;
        return res.status(200).json(await adService.findDiscordByAdId(id));
    } catch (error) {
        return res.status(404).send("Ad Not Found");
    }
});


app.listen(3030);