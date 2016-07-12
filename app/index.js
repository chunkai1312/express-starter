'use strict'; /* eslint new-cap: 0 */

const express = require('express');
const thing = require('./controllers/thing');
const router = express.Router();

router.get('/things', thing.index);
router.post('/things', thing.create);
router.get('/things/:id', thing.show);
router.put('/things/:id', thing.update);
router.delete('/things/:id', thing.destroy);

module.exports = router;
