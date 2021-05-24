const Pin = require('../models/Pin');
const AsyncManager = require('../utils/AsyncManager');
const PinError = require('../utils/PinError');


exports.createPin = AsyncManager(async (req, res, next) => {
    let newPin;
    try {
        newPin = await Pin.create(req.body);
    } catch (e) {
        console.log(e)
        return res
            .status(400)
            .json({
                error: e
            })
    }
    return res
        .status(201)
        .json(newPin);
})

exports.getAllPin = AsyncManager(async (req, res, next) => {
    const pins = await Pin.find();
    return res
        .status(200)
        .json(pins)
});

exports.getPin = AsyncManager(async (req, res, next) => {
    const pin = await Pin.findById(req.params.id);

    if (!pin) {
        return next(new PinError(`That Pin is not available`, 404));
    }

    return res
        .status(201)
        .json(pin);
});

exports.updatePin = AsyncManager(async (req, res, next) => {
    let pin = await Pin.findById(req.params.id);

    if (!pin) {
        return next(new PinError(`That Pin is not available`, 404));
    }

    pin = await Pin.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    return res
        .status(201)
        .json(pin);
});

exports.deletePin = AsyncManager(async (req, res, next) => {
    let pin = await Pin.findById(req.params.id);

    if (!pin) {
        return next(new PinError(`That Pin is not available`, 404));
    }

    await Pin.deleteOne();

    return res
        .status(201)
        .json({
            message: 'Pin deleted'
        });
});
