const dishes = [
    {
        id: 1,
        name: "Korv Stroganoff",
        description: "Korvstroganoff är en lättlagad och välsmakande korvgryta med bland annat falukorv, lök, grädde och tomatpuré som passar bra som vardagsmiddag. Servera korvstroganoffen med kokt ris.",
        country: "Sverige",
        time: 30,
        dietary: [5],
        ingredients: ["Ris","Falukorv","Gul Lök","Olja","Tomatpuré","Matlagningsgrädde","Mjölk","Soja","Dijonsenap","Salt","Peppar"],
        instructions: "Koka riset enligt anvisningen på förpackningen. Skär korven i stavar. Skala och hacka löken. Stek korv och lök i oljan i en stekpanna ca 5 minuter. Tillsätt tomatpuré och fräs någon minut. Rör ner grädde, mjölk, soja och dijonsenap. Låt sjuda ca 5 minuter. Smaka av med peppar och ev salt.",
        imageUrl: "../assets/images/stroganoff.jpg"
    },
    {
        id: 2,
        name: "Spaghetti Bolognese",
        description: "En klassisk italiensk pastarätt med köttfärssås smaksatt med tomat, vitlök och örter.",
        country: "Italien",
        time: 45,
        dietary: [],
        ingredients: ["Spaghetti","Nötfärs","Gul lök","Vitlök","Krossade tomater","Tomatpuré","Olja","Salt","Peppar","Oregano"],
        instructions: "Koka pastan enligt anvisning. Stek lök och vitlök i olja. Tillsätt köttfärs och bryn. Rör ner tomater och kryddor, låt sjuda 20 min. Servera med pasta.",
        imageUrl: "../assets/images/bolognese.jpg"
    },
    {
        id: 3,
        name: "Vegetarisk Chili",
        description: "En mustig vegetarisk gryta med bönor, tomat och kryddor.",
        country: "Mexiko",
        time: 35,
        dietary: [2],
        ingredients: ["Kidneybönor","Krossade tomater","Paprika","Gul lök","Vitlök","Chili","Spiskummin","Olja","Salt"],
        instructions: "Hacka grönsaker. Stek lök och vitlök. Tillsätt övriga ingredienser. Låt sjuda 20 minuter. Smaka av.",
        imageUrl: "../assets/images/chili.jpg"
    },
    {
        id: 4,
        name: "Kyckling Curry",
        description: "Krämig currygryta med kyckling och kokosmjölk.",
        country: "Indien",
        time: 40,
        dietary: [6],
        ingredients: ["Kyckling","Kokosmjölk","Curry","Lök","Vitlök","Olja","Salt"],
        instructions: "Stek kyckling. Tillsätt lök och vitlök. Häll i kokosmjölk och kryddor. Låt sjuda 20 minuter. Servera med ris.",
        imageUrl: "../assets/images/curry.jpg"
    },
    {
        id: 5,
        name: "Pad Thai",
        description: "Thailändsk nudelrätt med ägg, grönsaker och jordnötter.",
        country: "Thailand",
        time: 30,
        dietary: [5],
        ingredients: ["Risnudlar","Ägg","Morot","Salladslök","Soja","Jordnötter","Olja"],
        instructions: "Koka nudlar. Stek grönsaker. Tillsätt ägg och nudlar. Smaksätt med soja. Toppa med jordnötter.",
        imageUrl: "../assets/images/padthai.jpg"
    },
    {
        id: 6,
        name: "Falafel med Hummus",
        description: "Friterade kikärtsbollar serverade med hummus.",
        country: "Mellanöstern",
        time: 50,
        dietary: [1],
        ingredients: ["Kikärtor","Vitlök","Persilja","Spiskummin","Olja","Tahini","Citron"],
        instructions: "Mixa kikärtor. Forma bollar. Fritera. Servera med hummus.",
        imageUrl: "../assets/images/falafel.jpg"
    },
    {
        id: 7,
        name: "Lax med Potatis",
        description: "Ugnsbakad lax med kokt potatis och dill.",
        country: "Sverige",
        time: 25,
        dietary: [3],
        ingredients: ["Lax","Potatis","Dill","Smör","Salt","Peppar"],
        instructions: "Koka potatis. Baka lax i ugn. Krydda. Servera tillsammans.",
        imageUrl: "../assets/images/lax.jpg"
    },
    {
        id: 8,
        name: "Tacos",
        description: "Mexikansk klassiker med köttfärs och tillbehör.",
        country: "Mexiko",
        time: 20,
        dietary: [],
        ingredients: ["Tortilla","Köttfärs","Sallad","Tomat","Ost","Tacokrydda"],
        instructions: "Stek köttfärs. Tillsätt krydda. Hacka grönsaker. Fyll tortillas.",
        imageUrl: "../assets/images/tacos.jpg"
    },
    {
        id: 9,
        name: "Caprese Sallad",
        description: "Fräsch sallad med tomat, mozzarella och basilika.",
        country: "Italien",
        time: 10,
        dietary: [2,3],
        ingredients: ["Tomat","Mozzarella","Basilika","Olivolja","Salt"],
        instructions: "Skiva tomat och ost. Varva på tallrik. Ringla över olja. Salta.",
        imageUrl: "../assets/images/caprese.jpg"
    },
    {
        id: 10,
        name: "Ramen",
        description: "Japansk nudelsoppa med buljong och toppings.",
        country: "Japan",
        time: 60,
        dietary: [],
        ingredients: ["Nudlar","Buljong","Ägg","Fläsk","Salladslök"],
        instructions: "Koka buljong. Koka nudlar. Förbered toppings. Servera i skål.",
        imageUrl: "../assets/images/ramen.jpg"
    },
    {
        id: 11,
        name: "Shakshuka",
        description: "Ägg i kryddig tomatsås.",
        country: "Nordafrika",
        time: 30,
        dietary: [2],
        ingredients: ["Ägg","Tomat","Paprika","Lök","Vitlök","Spiskummin"],
        instructions: "Stek grönsaker. Tillsätt tomat. Knäck i ägg. Låt stelna.",
        imageUrl: "../assets/images/shakshuka.jpg"
    },
    {
        id: 12,
        name: "Pannkakor",
        description: "Tunna pannkakor serverade med sylt.",
        country: "Sverige",
        time: 25,
        dietary: [],
        ingredients: ["Mjöl","Mjölk","Ägg","Salt","Smör"],
        instructions: "Vispa smet. Stek i panna. Servera med sylt.",
        imageUrl: "../assets/images/pannkakor.jpg"
    },
    {
        id: 13,
        name: "Caesarsallad",
        description: "Sallad med kyckling, parmesan och dressing.",
        country: "USA",
        time: 25,
        dietary: [],
        ingredients: ["Kyckling","Romansallad","Parmesan","Krutonger","Dressing"],
        instructions: "Stek kyckling. Blanda sallad. Tillsätt topping. Ringla dressing.",
        imageUrl: "../assets/images/caesar.jpg"
    },
    {
        id: 14,
        name: "Miso Soppa",
        description: "Japansk soppa med miso och tofu.",
        country: "Japan",
        time: 15,
        dietary: [1,3,4],
        ingredients: ["Miso","Tofu","Vatten","Salladslök"],
        instructions: "Koka vatten. Tillsätt miso. Lägg i tofu. Toppa med lök.",
        imageUrl: "../assets/images/miso.jpg"
    },
    {
        id: 15,
        name: "Biff Tacos",
        description: "Tacos med stekt biff och grönsaker.",
        country: "Mexiko",
        time: 25,
        dietary: [],
        ingredients: ["Biff","Tortilla","Paprika","Lök","Kryddor"],
        instructions: "Stek biff. Hacka grönsaker. Fyll tortillas.",
        imageUrl: "../assets/images/bifftacos.jpg"
    },
    {
        id: 16,
        name: "Vegetarisk Lasagne",
        description: "Lasagne med grönsaker istället för kött.",
        country: "Italien",
        time: 60,
        dietary: [2],
        ingredients: ["Lasagneplattor","Tomat","Zucchini","Ost","Grädde"],
        instructions: "Varva ingredienser. Grädda i ugn 40 min. Servera.",
        imageUrl: "../assets/images/lasagne.jpg"
    },
    {
        id: 17,
        name: "Grillad Kyckling",
        description: "Saftig grillad kyckling med kryddor.",
        country: "USA",
        time: 35,
        dietary: [6],
        ingredients: ["Kyckling","Olja","Kryddor","Salt"],
        instructions: "Krydda kyckling. Grilla tills klar. Servera.",
        imageUrl: "../assets/images/grillkyckling.jpg"
    },
    {
        id: 18,
        name: "Risotto",
        description: "Krämig italiensk risrätt.",
        country: "Italien",
        time: 40,
        dietary: [2],
        ingredients: ["Ris","Buljong","Parmesan","Smör","Lök"],
        instructions: "Stek lök. Tillsätt ris. Häll i buljong gradvis. Rör tills krämigt.",
        imageUrl: "../assets/images/risotto.jpg"
    },
    {
        id: 19,
        name: "Poké Bowl",
        description: "Hawaiiansk skål med ris och rå fisk.",
        country: "Hawaii",
        time: 20,
        dietary: [],
        ingredients: ["Ris","Lax","Avokado","Soja","Sesam"],
        instructions: "Koka ris. Skär ingredienser. Montera skål.",
        imageUrl: "../assets/images/poke.jpg"
    },
    {
        id: 20,
        name: "Tomatsoppa",
        description: "Enkel och värmande soppa på tomat.",
        country: "Sverige",
        time: 25,
        dietary: [1,3,4],
        ingredients: ["Tomater","Lök","Vitlök","Buljong","Olja"],
        instructions: "Stek lök. Tillsätt tomater. Koka 15 min. Mixa slät.",
        imageUrl: "../assets/images/tomatsoppa.jpg"
    }
];

function createProducts() {
    let cards = document.getElementById("cards");

    for (let dish of dishes) {
        let div = document.createElement("a");
        div.innerHTML = `
        <img class="cardImg" src="${dish.imageUrl}" alt="">
                <h1>${dish.name}</h1>
                <p>${dish.description}}</p>
                <div class="info">
                    <h2>${dish.time} min</h2>
                    <h2>${dish.country}}</h2>
                </div>
        `;
        cards.appendChild(div);
        cards.classList.add("card");
    }
}

createProducts();