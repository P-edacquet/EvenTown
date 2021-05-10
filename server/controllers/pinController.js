const Pin = require('../models/Pin');
const AsyncManager = require('../utils/AsyncManager');
const PinError = require('../utils/PinError');


exports.createPin = AsyncManager(async (req, res, next) => {
    const newPin = await Pin.create(req.body);
    return res.status(201).json({
        success: true,
        data: newPin
    });
})

exports.getAllPin = AsyncManager(async (req, res, next) => {
    const pins = await Pin.find();
    return res.status(200).json({
        success: true,
        total: pins.length,
        data: pins
    })
});

exports.getPin = AsyncManager(async (req, res, next) => {
    const pin = await Pin.findById(req.params.id);

    if (!pin) {
        return next(new PinError(`That Pin is not available`, 404));
    }

    return res.status(201).json({
        success: true,
        data: pin
    });
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

    return res.status(201).json({
        success: true,
        data: pin
    });
});

exports.deletePin = AsyncManager(async (req, res, next) => {
    let pin = await Pin.findById(req.params.id);

    if (!pin) {
        return next(new PinError(`That Pin is not available`, 404));
    }

    await Pin.deleteOne();

    return res.status(201).json({
        success: true,
        data: {}
    });
});
