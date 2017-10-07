'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.bulkInsert('paragraphs', [
			{
				version_id: 1,
				group: 1,
				level: 1,
				sublevel: 0,
				title: "OBJET DE LA GARANTIE",
				condition: "test",
				editor: `<p><strong>La pr&eacute;sente {{eventName}} police garantit,</strong> sous r&eacute;serves des termes, conditions, plafonds, franchises, limitations et exclusions, convenus aux pr&eacute;sentes ou par avenant,<strong> les pertes p&eacute;cuniaires subies par le Souscripteur</strong> lorsque la manifestation assur&eacute;e mentionn&eacute;e aux conditions particuli&egrave;res est <strong>annul&eacute;e, abandonn&eacute;e, report&eacute;e, interrompue, &eacute;court&eacute;e ou d&eacute;plac&eacute;e</strong> exclusivement du <strong>fait de la survenance d&#39;un &eacute;v&eacute;nement non express&eacute;ment exclu</strong>.</p>

<p>La police indemnisera &eacute;galement <strong>la perte nette &eacute;tablie</strong> de d&eacute;bours suppl&eacute;mentaires et/ou de l&#39;augmentation de ses frais qu&#39;il aura raisonnablement et n&eacute;cessairement expos&eacute;s <ins>pour &eacute;viter ou diminuer les cons&eacute;quences d&#39;un sinistre couvert par ce contrat</ins>,<strong> et/ou les pertes de recette&nbsp;</strong>escompt&eacute;e, &agrave; conditions que l&#39;engagement maximum des assureurs au titre de la pr&eacute;sente assurance, ne d&eacute;passe pas les limites de garantie sp&eacute;cifi&eacute;es ci-apr&egrave;s.<br />
Le pr&eacute;sent contrat est r&eacute;gie par le Code des Assurances et les <strong>Conditions G&eacute;n&eacute;rales OVATIOCG2014/01</strong> auxquelles il se r&eacute;f&eacute;rent<br />
&nbsp;</p>`,
				createdAt: new Date(),
				updatedAt: new Date()
			},{
				version_id: 1,
				group: 1,
				level: 2,
				sublevel: 0,
				title: "DÉCLARATIONS DU PRENEUR D’ASSURANCE",
				condition: "test",
				editor: `<p>La pr&eacute;sente police est &eacute;tablie <strong>d&#39;apr&egrave;s les d&eacute;clarations du Souscripteur</strong>, y compris l&#39;&eacute;valuation du montant du Risque Maximum tel qu&#39;il ressort des Conditions Particuli&egrave;res, ainsi que les autres indications figurant aux Conditions Particuli&egrave;res. Le Souscripteur doit r&eacute;pondre exactement aux questions pos&eacute;es par les Assureurs, notamment dans le questionnaire qui fait partie int&eacute;grante de la Police, par &eacute;crit ou par tout autre moyen, de mani&egrave;re &agrave; permettre aux Assureurs de se faire une opinion sur le risque &agrave; garantir (art. L. 113-2 du Code des Assurances).<br />
&nbsp;</p>`,
				createdAt: new Date(),
				updatedAt: new Date()
			},{
				version_id: 1,
				group: 1,
				level: 2,
				sublevel: 1,
				title: "MANIFESTATION ASSURÉE",
				condition: "test",
				editor: `<p><strong>Ev&eacute;nement objet du contrat</strong> : BAL DU 31/12/2017<br />
Artiste/programme : Le souscripteur d&eacute;clare organiser pour le compte de la ville de Rennes, un bal gratuit pr&eacute;vu la nuit de la Saint Sylvestre &agrave; Rennes de 0h00 &agrave; 5h00 du matin au LIBERTE.<br />
Lieu(x) : RENNES<br />
Type d&rsquo;&eacute;v&eacute;nement : Autres BAL GRATUIT<br />
Nombre de repr&eacute;sentation(s) : 1<br />
Budget : 58 300 &euro;<br />
Type de lieux : Salle</p>`,
				createdAt: new Date(),
				updatedAt: new Date()
			},{
				version_id: 1,
				group: 1,
				level: 2,
				sublevel: 2,
				title: "DURÉE DE LA MANIFESTATION",
				condition: "test",
				editor: `<p>Dates de production : du 28/09/2017 au 30/09/2017<br />
&nbsp;</p>`,
				createdAt: new Date(),
				updatedAt: new Date()
			},{
				version_id: 1,
				group: 1,
				level: 2,
				sublevel: 3,
				title: "CONVENTIONS",
				condition: "test",
				editor: `<p><strong>Le souscripteur d&eacute;clare en outre :</strong><br />
- Avoir obtenu pr&eacute;alablement<strong> toutes les autorisations n&eacute;cessaires</strong> &agrave; la tenue de l&#39;&eacute;v&eacute;nement<br />
- Qu&#39;il n&rsquo;existe par ailleurs, aucune <strong>autre assurance couvrant tout ou partie des m&ecirc;mes risques</strong><br />
- Qu&#39;au jour de la prise d&#39;effet des garanties, il n&#39;a connaissance <strong>d&#39;aucun &eacute;l&eacute;ment susceptible de&nbsp;</strong><strong>mettre en jeu la garantie du pr&eacute;sent contrat</strong><br />
- Que le mat&eacute;riel utilis&eacute; dans le cadre de la manifestation<strong> respecte la r&eacute;glementation en vigueur</strong> et que son utilisation est <strong>conforme aux recommandations techniques.</strong></p>

<p>Les garanties ne seront acquises que si ces dispositions sont respect&eacute;es.<br />
&nbsp;</p>`,
				createdAt: new Date(),
				updatedAt: new Date()
			},{
				version_id: 1,
				group: 1,
				level: 3,
				sublevel: 0,
				title: "ASSURÉ",
				condition: "test",
				editor: `<p><strong>Le Preneur d&#39;assurance</strong> ainsi que, le cas &eacute;ch&eacute;ant, les assur&eacute;s additionnels mentionn&eacute;es aux pr&eacute;sentes et ses/leurs entit&eacute;s affil&eacute;es.</p>

<p>ASSUR&Eacute;(S) ADDITIONNEL(S) : N&Eacute;ANT<br />
&nbsp;</p>`,
				createdAt: new Date(),
				updatedAt: new Date()
			},{
				version_id: 1,
				group: 1,
				level: 4,
				sublevel: 0,
				title: "MONTANT DES GARANTIES & FRANCHISES",
				condition: "test",
				editor: `<p>&nbsp;</p>

<p>LIMITATION CONTRACTUELLE D&#39;INDEMNIT&Eacute; : <strong>SANS OBJET</strong><br />
FRANCHISE APPLICABLE : <strong>N&eacute;ant</strong><br />
<strong>S&#39;agissant d&#39;un budget pr&eacute;visionnel communiqu&eacute; pour la souscription du contrat, le budget est &eacute;volutif et fera l&#39;objet de d&eacute;claration de la part de l&#39;Assur&eacute;.<br />
Dans le cadre d&#39;une tourn&eacute;e, il est pr&eacute;cis&eacute; que les capitaux peuvent varier en fonction des lieux o&ugrave; se d&eacute;roulent les repr&eacute;sentations, par cons&eacute;quent, les montants figurant sur chaque date dans le planning ne constituent pas une de limite contractuelle par &eacute;v&eacute;nement.</strong></p>`,
				createdAt: new Date(),
				updatedAt: new Date()
			},{
				version_id: 1,
				group: 1,
				level: 5,
				sublevel: 0,
				title: "EXCLUSIONS GÉNÉRALES DE LA GARANTIE TOUS RISQUES SAUF",
				condition: "test",
				editor: `<p><strong>Les clauses d&rsquo;exclusion ci-apr&egrave;s stipul&eacute;es ne sont pas exhaustives, l&rsquo;int&eacute;gralit&eacute; des exclusions applicables au contrat &eacute;tant mentionn&eacute;es dans les Conditions G&eacute;n&eacute;rales :</strong><br />
&nbsp;</p>`,
				createdAt: new Date(),
				updatedAt: new Date()
			}

		], {});

	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.bulkDelete('paragraphs', null, {});
	}
};
