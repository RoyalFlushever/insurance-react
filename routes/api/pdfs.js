var express = require('express');
var router = express.Router();
// var sequelize = require('sequelize');
// var VersionService = require('./../../services/VersionService');
var path = require('path');
var fs = require('fs');
var pdf = require('html-pdf');
const baseUrl = path.resolve();

router.get('/', function(req, res) {
	res.sendFile(`${baseUrl}/temp/${req.query.file}.pdf`);
});

router.post('/', function(req, res) {
	var css = "<style>"+fs.readFileSync('./client/css/add.css', 'utf8')+"</style>";
	// var html = fs.readFileSync('./pdfAssets/cover.html', 'utf8');
	var html = req.body.html+css;
	var options = { 
		base: 'file:///'+baseUrl+'/pdfAssets/',
		"height": "11in",
		"width": "8.5in", 
		"border": {
			"top": "35px",
			"right": "10px",
			"bottom": "25px",
			"left": "10px"
		},
		"footer": {
			"height": "34px",
			"contents": {
				default: 	`<div class="footer">
								<div class="title_div">
									<div class="title_left">
										POLICE ANNULATION DE MANIFESTATION
									</div>
									<div class="title_center">
										PROJET DE CONDITIONS PARTICULIÈRES
									</div>
									<div class="pages">
										PAGE {{page}} SUR {{pages}}
									</div>
								</div>
								<div class="sub_title">
									37, rue de Liège - 75008 Paris / 1, avenue du Prado - 13006 MARSEILLE / Tél: 01 42 77 72 99 / www.ovatio.eu / e-mail: contact@ovatio.eu
								</div>
								<div class="description">
									502 625 080 R.C.S PARIS / Société par actions simplifiées au capital de 52.330 € / Intermédiaire immatriculé à l'ORIAS sous le N° 08 040 606 sous le contrôle de l'ACPR – 61, rue Taitbout 75436 Paris Cedex 09<br/>
									Garantie financière et assurance responsabilité professionnelle N°45400995 conformes aux articles L530-1 et L530-2 du Code des Assurances.
								</div>
							</div>`			
			}
		},
	};
	let timeStampName = Date.now();
	pdf.create(html, options).toFile('./temp/'+timeStampName+'.pdf', function(err, file){
		res.status(200).send(timeStampName.toString());

	});

});

module.exports = router;
