const views = require('../models/viewModel')

// add view
exports.addViewController = async (req, res) => {
    console.log('Inside addViewController');
    
    try{
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        let view = await views.findOne({ date: startOfDay });

        if (!view) {
            view = new views({ date: startOfDay, count: 1 });
        } else {
            view.count += 1;
        }

        await view.save();
        res.status(200).json({ count: view.count });
    }catch(err){
        res.status(401).json(err)
    }
}

// all views 
exports.getViewController = async (req, res) => {
    console.log('Inside getViewController');

    try {

        const startDate = new Date(new Date().getFullYear(), 0, 0);
        const currentDate = new Date();
        currentDate.setHours(23, 59, 59, 999);

        const allViews = await views.find({
            date: { $gte: startDate, $lte: currentDate }
        }).sort({ date: 1 });

        const viewData = allViews.map(view => ({
            date: view.date.toISOString().split('T')[0],
            count: view.count
        }));

        res.status(200).json(viewData);
    } catch (err) {
        res.status(500).json({ error: "Server error", details: err });
    }
};
