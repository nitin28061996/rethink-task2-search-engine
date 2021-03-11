const express = require('express');
const router = express.Router();
const esClient = require('../client');
router.get('/', async (req, res) => {
        let response = {
                results: [],
                resultsCount: ''
        }
        let { q, page } = req.query
        q=q.trim()
        let query = q.length > 0 ? {
                multi_match: {
                        query: q,
                        type: 'phrase_prefix',
                        fields: ['first_name', 'last_name'],
                }
        } :     {
                        match_all: {}
                }


        await esClient.search({
                index: 'people',
                type: '_doc',
                body: {
                        size: 100,
                        from: (page - 1) * 100,
                        query: query
                }
        }).then(res => {response.results = res.hits.hits;
        }).catch(err => console.log(err))

        await esClient.count({
                index: 'people',
                type: '_doc',
                body: { query: query }

        }).then(res => {
                response.resultsCount = res.count;
        })
                .catch(err => console.log(err))
        return res.json(response)
});

module.exports = router;