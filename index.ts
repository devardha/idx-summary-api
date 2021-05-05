const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const dotenv = require('dotenv').config();

const app = express();

app.get('/', async (_req: any, res: any) => {
    res.json({status: "ok", message: 'developed by devardha'})
})

app.get('/summaries/:code', async (req: { params: { code: any; }; }, res: any) => {
    try {
        const { code } = req.params
        if(!code) return res.status(404).json({status: 'error', message: 'invalid request'})

        const { data } = await axios.get(`${process.env.API_ENDPOINT}/${code}`)

        if(!data) return res.status(404).json({status: 'error', message: 'data not found'})

        const $ = cheerio.load(data);

        const results: string[] = []
        $('.span-5').each((index: number, element: any) => {
            if(index === 0) return
            const tds = $(element).find(".summary_value")
            const last = $(tds[0]).text()

            if(index === 1) results.push(last)
            if(index === 2) results.push(last)
            if(index === 3) results.push(last)
            if(index === 4) results.push(last)
            if(index === 5) results.push(last)
            if(index === 6) results.push(last)
        })

        const checkValue = (change: string) => {
            if(change.includes('-')) return 'down'

            return 'up'
        }

        const parseDate = (dateString: string): Date => {
            const splitted = dateString.split(':')[1].trim()
            const dateArray = splitted.split('-')

            const year = dateArray[2]
            const month = dateArray[1]
            const day = dateArray[0]

            return new Date(`${year}-${month}-${day}`)
        }

        const parseNumber = (numberString: string): number => {
            const removeComma = numberString.replace(',', '')
            
            return parseInt(removeComma)
        }

        const company_name = $('#CONTENT > div > h3').text()
        const date = $('#CONTENT > div > h4').text()

        interface Data {
            close: number,
            prev: number,
            change: string,
            growth: string,
            open: number,
            high: number,
            low: number,
            date: Date
        }

        const finalData: Data = {
            close: parseNumber(results[0]),
            prev: parseNumber(results[1]),
            change: results[2],
            growth: checkValue(results[2]),
            open: parseNumber(results[3]),
            high: parseNumber(results[4]),
            low: parseNumber(results[5]),
            date: parseDate(date)
        }

        return res.json({
            status: "ok",
            code: code,
            company_name,
            data: finalData
        })
    } catch (error) {
        return res.status(500).json({status: 'error', message: 'internal server error', error})
    }
})

app.listen(4000, () => console.log('Server running'))