// Informatie over klachten ("Voor wie?").
// Elke klacht krijgt een tegel op de startpagina en een eigen pagina op /klachten/<slug>.
// Een klacht toevoegen = hier een blok bijzetten. De inhoud moet door Siegert nagelezen zijn.

export const klachten = [
  {
    slug: "hallux-valgus",
    title: "Hallux valgus",
    subtitle: "Scheefstand van de grote teen",
    summary:
      "De grote teen groeit scheef en aan de binnenkant van de voet ontstaat een knobbel. Gewone schoenen gaan knellen en stappen wordt pijnlijk.",
    intro: [
      "Bij een hallux valgus staat de grote teen scheef, in de richting van de andere tenen. Aan de binnenkant van de voet komt het gewricht van de grote teen daardoor naar buiten: de typische knobbel.",
      "De scheefstand ontstaat meestal geleidelijk en kan in de loop van de jaren toenemen."
    ],
    symptomsTitle: "Waaraan merkt u het?",
    symptoms: [
      "Een knobbel aan de binnenkant van de voorvoet, die rood en gevoelig kan worden door de druk van de schoen.",
      "Pijn in de voorvoet bij het stappen of lang rechtstaan.",
      "Eelt of likdoorns op plaatsen waar de schoen of de tenen tegen elkaar drukken.",
      "De tweede teen komt in de verdrukking en kan krom gaan staan.",
      "Gewone schoenen worden te smal ter hoogte van de voorvoet."
    ],
    helpIntro:
      "Een schoen of steunzool zet de teen niet opnieuw recht. Ze kunnen wel de druk wegnemen en het stappen comfortabeler maken.",
    help: [
      {
        title: "Steunzolen",
        text: "Een steunzool op maat ondersteunt de voet en verdeelt de druk onder de voorvoet beter."
      },
      {
        title: "Orthopedische schoenen op maat",
        text: "Past geen gewone schoen meer, dan wordt de schoen rond uw voet gemaakt: met voldoende ruimte voor de knobbel en de tenen, en zonder naden op de gevoelige plaatsen."
      }
    ],
    shoeAdvice: [
      "Kies een schoen met een brede, ruime voorvoet, zodat de tenen niet samengedrukt worden. Vermijd smalle en spitse modellen.",
      "Zacht en soepel bovenmateriaal, zonder naden of stiksels ter hoogte van de knobbel.",
      "Een lage hak. Hoe hoger de hak, hoe meer druk er op de voorvoet komt.",
      "Een sluiting met veters of klittenband, zodat de voet goed vastzit en niet naar voren schuift.",
      "Een uitneembare binnenzool, zodat er plaats is voor een steunzool."
    ],
    illustratie: "hallux-valgus"
  },
  {
    slug: "artrose",
    title: "Artrose in voet of enkel",
    subtitle: "Slijtage van het gewricht",
    summary:
      "Het kraakbeen in een gewricht wordt dunner. Het gewricht wordt stijf en pijnlijk, vooral bij het afrollen van de voet.",
    intro: [
      "Bij artrose wordt het kraakbeen in een gewricht dunner en minder soepel. Het gewricht beweegt daardoor moeilijker en kan pijn doen bij belasting.",
      "In de voet komt artrose vaak voor in het gewricht van de grote teen, in de middenvoet en in de enkel."
    ],
    symptomsTitle: "Waaraan merkt u het?",
    symptoms: [
      "Pijn bij het stappen, vooral op het moment dat de voet afrolt.",
      "Stijfheid bij de eerste stappen na het opstaan of na lang zitten.",
      "Het gewricht buigt minder ver dan vroeger.",
      "Soms een zwelling of een verdikking rond het gewricht, waardoor de schoen gaat knellen."
    ],
    helpIntro:
      "Een schoen of steunzool neemt de artrose niet weg. Ze kunnen het pijnlijke gewricht wel ontlasten, zodat stappen opnieuw vlotter gaat.",
    help: [
      {
        title: "Steunzolen",
        text: "Een steunzool op maat ondersteunt de voet, verdeelt de druk en dempt de schokken bij elke stap."
      },
      {
        title: "Orthopedische schoenen op maat",
        text: "De zool kan stijver gemaakt worden en een afwikkelbalk krijgen: een lichte ronding onder de schoen die het afrollen overneemt, zodat het gewricht zelf minder moet buigen. Bij artrose in de enkel kan een hogere schoen extra steun geven."
      }
    ],
    shoeAdvice: [
      "Een stevige zool die weinig plooit ter hoogte van de voorvoet. Hoe minder de schoen buigt, hoe minder het gewricht moet bewegen.",
      "Een zool met een lichte ronding naar de tip toe, die helpt bij het afrollen van de voet.",
      "Een schokdempende zool en hak, die de stoot bij elke stap opvangen.",
      "Een stevige hielkap en een sluiting met veters of klittenband, voor een stabiele stand.",
      "Voldoende ruimte op de plaats waar het gewricht verdikt is.",
      "Een uitneembare binnenzool, zodat er plaats is voor een steunzool."
    ]
  }
];

export const getKlacht = (slug) => klachten.find((k) => k.slug === slug);
