const alerts = require('../models/alertModel')

// create alert
exports.createAlertController = async (req, res) => {
  console.log('Inside createAlertController');
  const { title, message, scheduledAt, status } = req.body;

  try {
    const notification = new alerts({
      title, message, scheduledAt, status
    });
    await notification.save();
    res.status(200).json(notification);
  } catch (err) {
    res.status(401).json(err);
  }
};

// edit alert
exports.editAlertController = async (req, res) => {
  console.log('Inside editAlertController');
  const { id } = req.params;
  const { status } = req.body;

  try {
    const notification = await alerts.findByIdAndUpdate(id, { status }, { new: true });
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json(notification);
  } catch (err) {
    res.status(401).json(err);
  }
}

// get all alerts
exports.getAllAlertsController = async (req, res) => {
  console.log('Inside getAllAlertsController');

  try {
    const notifications = await alerts.find().sort({ scheduledAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(401).json(err);
  }
}

// get active alerts
exports.getActiveAlertsController = async (req, res) => {
  console.log('Inside getActiveAlertsController');

  try {
    const notifications = await alerts.find({ status: 'active' }).sort({ scheduledAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(401).json(err);
  }
}