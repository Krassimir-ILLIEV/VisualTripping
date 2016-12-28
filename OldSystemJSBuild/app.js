"use strict";
var express = require('express');
var app = express();
app.set('view engine', 'pug');
app.use('/libs', express.static('./node_modules'));
app.use('/static', express.static('./public'));
app.get('/', function (req, res) {
    return res.render('index');
});
var superheroes = [
    { name: 'Batman', secretIdentity: 'Bruce Wayne', powers: ['Utility belt', 'Martial arts', 'Intelligence'] },
    { name: 'Dr. Strange', secretIdentity: 'Dr. Stephen Strange', powers: ['Magic', 'Martial arts'] }
];
var factions = [
    { name: 'Avengers' },
    { name: 'Justice League' },
    { name: 'The Bat Family' },
    { name: 'Fantastic Four' },
    { name: 'Guardians of the Galaxy' }
];
var tourPoints = [
    {
        country: 'country1',
        city: 'city1',
        from: '01012016',
        to: '10012016'
    },
    {
        country: 'country2',
        city: 'city2',
        from: '11012016',
        to: '12012016'
    }
];
var tour1 = {
    id: 0,
    tourPoints: tourPoints,
    totalPrice: 1000,
    dateCreated: '25122015',
    createdBy: 'creator1',
    participants: ['participant1', 'participant2'],
    keywords: ['new year', 'newYear'],
    description: 'description1',
    comments: ['comment1', 'comment2', 'comment3'],
    pictures: ['picture1', 'picture2', 'picture3'],
    rating: 5,
};
var tour2 = {
    id: 1,
    tourPoints: tourPoints,
    totalPrice: 2000,
    dateCreated: '02022016',
    createdBy: 'creator2',
    participants: ['participant3', 'participant4'],
    keywords: ['cold', 'winter'],
    description: 'description2',
    comments: [''],
    pictures: ['picture4'],
    rating: 10,
};
var testingTours = [
    tour1,
    tour2
];
app.get('/api/superheroes', function (req, res) {
    res.send({
        result: superheroes
    });
});
app.get('/api/factions', function (req, res) {
    res.send({
        result: factions
    });
});
app.get('/api/tours', function (req, res) {
    res.send({
        result: testingTours
    });
});
app.get('/api/tours/:id', function (req, res) {
    //console.log(JSON.stringify(testingTours[req.params.id]));
    res.send({
        result: testingTours[req.params.id]
    });
});
app.listen(3000, function () { return console.log('App listening on :3000'); });
//# sourceMappingURL=app.js.map