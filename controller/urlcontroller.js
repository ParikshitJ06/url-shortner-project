const express = require('express');
const shortid = require('shortid');
const Url = require('../model/urlSchema');

exports.handlegenerateNewShortUrl = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is required" });
    
    const unique_shortID = shortid.generate(); // corrected the function call

    await Url.create({
        shortId: unique_shortID,
        requiredurl: req.body.url,
        visitHistory: []
    });

    return res.json({ id: unique_shortID });
};

exports.handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortid; // corrected to match the key in database
    const result = await Url.findOne({shortId: shortId }); // corrected to match the key in database

    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({ totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory });
};
