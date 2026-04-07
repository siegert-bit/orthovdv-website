// Mock data en functies voor de landing page

export const contactInfo = {
  name: "Siegert Van de Voorde",
  email: "siegert@orthovdv.be",
  phone: "+32472917918",
  whatsapp: "+32472917918",
  riziv: "101546-46 001",
  btw: "BE 1021.586.776",
  address: "Antwerpsesteenweg 29 bus 7, 2500 Lier"
};

export const services = [
  {
    id: 1,
    title: "Maatwerk Orthopedische Schoenen",
    description: "Volledig op maat gemaakte orthopedische schoenen voor diverse voetproblemen. Perfecte pasvorm en ondersteuning, volledig aangepast aan uw unieke voetanatomie. Ik kom bij u thuis voor de volledige service.",
    icon: "shoe",
    homeService: true
  },
  {
    id: 2,
    title: "Orthopedische Steunzolen",
    description: "Op maat gemaakte steunzolen die perfect aansluiten bij uw voetanatomie. Corrigeren van looppatroon, drukverlichting en optimaal comfort. Service vindt plaats in de praktijk.",
    icon: "footprints",
    homeService: false
  },
  {
    id: 3,
    title: "Professionele Voetanalyse",
    description: "Uitgebreide analyse van uw voeten, looppatroon en specifieke behoeften. Dit vormt de basis voor uw perfecte maatwerk schoenen of steunzolen.",
    icon: "search",
    homeService: true
  }
];

export const processSteps = [
  {
    id: 1,
    title: "Bezoek aan Huis",
    description: "Ik kom bij u langs voor een grondige voetanalyse en maatname. Inclusief 3D-maatname voor de perfecte pasvorm van uw maatwerk schoenen.",
    icon: "phone"
  },
  {
    id: 2,
    title: "Passessie",
    description: "Op basis van de 3D-scan vervaardigen we een transparante passchoen om de pasvorm en drukpunten nauwkeurig te controleren en te optimaliseren vóór de finale afwerking",
    icon: "home"
  },
  {
    id: 3,
    title: "Levering",
    description: "Uw definitieve maatschoenen worden bij u thuis afgeleverd. We controleren samen het resultaat en het loopcomfort, inclusief advies over gebruik en onderhoud.",
    icon: "check-circle"
  }
];

export const aboutContent = {
  title: "Uw Orthopedisch Schoentechnoloog",
  paragraphs: [
    "Als gediplomeerd erkend orthopedisch schoentechnoloog help ik mensen met voetproblemen al jarenlang aan kwalitatief hoogstaand maatwerk schoeisel. Mijn expertise ligt in het creëren van orthopedische schoenen die niet alleen functioneel zijn, maar ook comfortabel en esthetisch verantwoord.",
    "Wat mijn service uniek maakt? Ik kom bij u thuis, waar u ook in België woont. Geen afstandsbeperking, geen stress om naar een werkplaats te komen. De volledige zorg – van eerste analyse tot finale levering – vindt plaats in de vertrouwde omgeving van uw eigen huis."
  ]
};
