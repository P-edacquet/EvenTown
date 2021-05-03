require('dotenv').config();
until = require('./utils/until');

let knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL
    }
});
const joi = require('joi');
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());


app.get('/pin', async function (req, res) {
    const [rows, err] = await until(
        knex.select(['pin_id', 'name', 'lat'])
            .from('pin')
    )

    if (err != null) {
        return res.status(500).json({
            statusCode: 500,
            message: 'internal Server Error',
            error: {
                message: 'Error with database connection',
                path: ['knex', 'connection']
            },
            data: null
        });
    }

    return res.status(200).json({
        statusCode: 200,
        message: 'successful',
        data: rows
    });
});

app.post('/pin', function (req, res) {
    const schema = joi.object({
        name: joi.string()
    })

    const {error, value} = schema.validate(req.body)

    if(error !== undefined){
        console.log("ERROR::", error);
        return res.status(500).json({
            statusCode:500,
            message: 'Internal Error'
        })
    }
})


app.listen(port, () => {
    console.log(`App listen on http://localhost:${port}/`)
})