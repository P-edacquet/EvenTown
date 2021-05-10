const router = require('express').Router();
const {
    createPin,
    getAllPin,
    updatePin,
    deletePin
} = require('../controllers/pinController');

router.route('/').get(getAllPin).post(createPin);

router.route('/:id').patch(updatePin).delete(deletePin);

module.exports = router;