const TimeUtil = require('../src/utils/TimeUtil');

exports.up = (pgm) => {
  pgm.createTable('foods', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    origin: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    province: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    image: {
      type: 'TEXT',
      notNull: true,
    },
    created_at: {
      type: 'BIGINT',
      notNull: true,
    },
    updated_at: {
      type: 'BIGINT',
    },
    deleted_at: {
      type: 'BIGINT',
    },
  });

  pgm.sql(`INSERT INTO foods VALUES ('food-nnKC5j02dhKLqYd7', 'Gudeg', 'Gudeg is a traditional Javanese dish from Yogyakarta and Central Java, Indonesia. Gudeg is made from young unripe jack fruit stewed for several hours with palm sugar, and coconut milk. Additional spices include garlic, shallot, candlenut, coriander seed, galangal, bay leaves, and teak leaves, the latter giving a reddish-brown color to the dish. It is often described as "green jack fruit sweet stew"', 'Yogyakarta', 'Daerah Istimewa Yogyakarta', 'https://storage.googleapis.com/public-rasa-application/assets/Gudeg.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-0roH33CzEP5EyetE', 'Peuyeum', 'Peuyeum is a fermented cassava product from Indonesia. Peuyeum or cassava tapay is known as “Peuyeum Bandung,” whose name refers to a provincial capital in West Java, Java Island. Peuyeum is processed through fermentation and uses starter cultures in the form of yeast tapay. The word peuyeum comes from “meuyeum” or “memeram,” which in Sundanese—the native language of West Java—means an incubation. This is because the process to make it requires curing time for ripening', 'Bandung', 'Jawa Barat', 'https://storage.googleapis.com/public-rasa-application/assets/Peuyeum.jpg',${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-SXIRzsBEvRSU2EBU', 'Soto Lamongan', 'Has been there at Grand Indonesia for years, not sure what had happened to this place but now price is affordable although service is minimal. Soto lamongan is good, and soup base is rather full of herbs and spices. This place has wide range of menu but lack of depth. You can try many kinds of Indonesian food without having to choose over too many menus.', 'Lamongan', 'Jawa Timur', 'https://storage.googleapis.com/public-rasa-application/assets/SotoLamongan.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-QEDRz5E2DSIEIE5C', 'Serabi', 'Kue Serabi is Indonesian Pancakes that are made with coconut milk, sometimes grated coconut is added and rice flour. Usually served with a coconut milk and palm sugar sauce. Traditionally, Kue Serabi are served without any fruit or topping as its sold as street food. However, these days you’ll find kue serabi sold in Warungs (roadside eateries), boutique hotels and at home stay places as a breakfast option with toppings.', 'Yogyakarta', 'Solo', 'https://storage.googleapis.com/public-rasa-application/assets/Serabi.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-20RobnXzCtIEnYHD', 'Ayam Betutu', 'Ayam Betutu is a local Bali dish made of a whole chicken and cooked in a cooking-method called “betutu”, which is quite similar to grilled, but what makes it different is because betutu is burned inside a fire husk. Ayam betutu is using whole chicken that is filled with various special Balinese ingredients. Apart from chicken, betutu-method also can be done using a duck.', 'Gilimanuk', 'Bali', 'https://storage.googleapis.com/public-rasa-application/assets/AyamBetutu.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-It57sQe7EQDeItIe', 'Beberuk Terong', 'The typical food of Lombok is not only spicy, but also fresh sour. Like duck made from raw eggplant and string beans', 'Lombok', 'Nusa Tenggara Barat', 'https://storage.googleapis.com/public-rasa-application/assets/BeberukTerong.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-E2D32vRBonmI0n5Q', 'Rendang', 'Beef rendang is one of the original cuisines of Minangkabau descent and Sumatra culture. It is served at special occasions to honor guests and during festive seasons. It is a delicious Indonesian dish prepared with a myriad of herbs and spices cooking for a few hours until all the liquids have been completely absorbed by the meat. Beef rendang is best eaten with steamed rice and condiments such as fried onions and chili pieces.', 'Padang', 'Sumatra Barat', 'https://storage.googleapis.com/public-rasa-application/assets/Rendang.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-sSrEPEYeeetzEIma', 'Sate Madura', 'Sate Madura is satay that has a special Madurese seasoning. Sate Madura is usually made from chicken. Besides being famous as an island of salt, Madura is also famous for its satay.', 'Madura', 'Jawa Timur', 'https://storage.googleapis.com/public-rasa-application/assets/SateMadura.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-nzo55SrDGz4o45oz', 'Pempek', 'Pempek is a traditional Indonesian fish cake made with ground fish meat and tapioca. The actual origin of this dish is the city of Palembang, situated in the South Sumatra province. The origin story of pempek says that an old Palembang citizen was tired of the traditional fried or grilled fish, so he thought of an innovative way to ground the meat, mix it with tapioca flour, and deep-fry it to get a crunchy and delicious snack.', 'Palembang', 'Sumatra Selatan', 'https://storage.googleapis.com/public-rasa-application/assets/Pempek.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-QzCzDUXS45073yHI', 'Soto Banjar', 'Soto is a popular Indonesian-style chicken soup. They can be easily found as street food or in the restaurants pretty much anywhere you go in Indonesia. The varieties on each province or islands are countless. Some are with clear soup and some with coconut milk.', 'Banjarmasin', 'Kalimantan Selatan', 'https://storage.googleapis.com/public-rasa-application/assets/SotoBanjar.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-5HQrIE3y4PEnSYtG', 'Nasi Pecel', 'This Indonesian dish combines rice with various vegetables and a sweet peanut sauce. It commonly employs lightly blanched green vegetables such as water spinach, asparagus bean, papaya, and cassava leaves, as well as bean sprouts, tofu, and tempeh.', 'Madiun', 'Jawa Timur', 'https://storage.googleapis.com/public-rasa-application/assets/NasiPecel.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-sSzIERr3rRQC5Ezt', 'Kerak Telor', 'Kerak telor (English: Egg crust) is a Betawi traditional spicy omelette dish in Indonesian cuisine. It is made from glutinous rice cooked with egg and served with serundeng (fried shredded coconut), fried shallots and dried shrimp as topping. It is considered as a snack and not as a main dish. The vendors of kerak telor are easily the most ubiquitous during annual Jakarta Fair and it has also become a must-have menu item for visitors at the event.', 'Jakarta', 'Daerah Khusus Ibu Kota Jakarta', 'https://storage.googleapis.com/public-rasa-application/assets/KerakTelor.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-25IvzvaDr7tQyUPb', 'Rawon', 'Rawon is an Indonesian beef soup. Originating from East Java, rawon utilizes the black keluak nut as the main seasoning, which gives a dark color and nutty flavor to the soup.', 'Maluku', 'Maluku', 'https://storage.googleapis.com/public-rasa-application/assets/Rawon.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-Hrt0tQtH3yr3sRt3', 'Papeda', 'Papeda, or bubur sagu, is a congee made from sago starch that is a staple food of the indigenous people in eastern Indonesia, namely parts of Sulawesi, Maluku Islands and Papua.', 'Arekan', 'Jawa Timur', 'https://storage.googleapis.com/public-rasa-application/assets/Papeda.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-XEz5UPv4t3z3Intt', 'Mie Aceh', 'Mie Aceh gained its popularity during my time when I was a university student in Bogor back in 1996.  Mie is an Indonesian word for noodle meanwhile Aceh is the very west province of Indonesia.  Its located on the west tip of Sumatra island.  So the perfect translation for this Mie Aceh is Aceh curry noodles.', 'Aceh', 'Nanggroe Aceh Darussalam', 'https://storage.googleapis.com/public-rasa-application/assets/MieAceh.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-nUEymPItR35vsRrE', 'Nasi Kuning', 'Rice is a staple food for the majority of Indonesian. It holds an important place in the countrys culture. A typical Indonesian meal consists of steamed rice and one or two main dishes. Steamed rice or plain rice is known as Nasi Putih or literally White rice. Experiencing the local culture is a huge part of travelling and trying traditional food is a good way to taste a small part of that culture. Talking about Indonesian food seems to be no end in sight. Fried Rice is indeed famous but variety of rice dishes make Indonesian food is one of the world greatest cuisines.', 'Samarinda', 'Kalimantan Timur', 'https://storage.googleapis.com/public-rasa-application/assets/NasiKuning.jpg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-5bnUyUt0U2EyS7o5', 'Coto Makassar', 'Coto Makassar, also known as Coto Mangkasara, is a traditional Indonesian beef soup from Makassar in South Sulawesi. The beef is stewed until soft and tender in a perfectly seasoned broth filled with fragrant spices. Enjoy it on its own or with some rice cakes and chili sauce for an absolutely wholesome meal.', 'Makassar', 'Sulawesi Selatan', 'https://storage.googleapis.com/public-rasa-application/assets/CotoMakassar.jpeg', ${TimeUtil.getDateNow()})`);
  pgm.sql(`INSERT INTO foods VALUES ('food-o3D0SRGzHmQvsR0r', 'Tahu Sumedang', 'Having a savory taste makes this type of food phenomenal. The savory is indeed difficult to match. Just try to compare it with yellow tofu, white tofu or other tofu. Dont be surprised, if all of that is nothing. Hence, because of that taste, Sumedangs tofu became legendary. That is tofu Sumedang, a legendary dish of this city. Besides being tasty, the skin of this tofu is crispy and the filling is soft and tender. Another uniqueness is the size of Sumedang tofu is not too big, only 2.5 x 2.5 cm.', 'Sumedang', 'Jawa Barat', 'https://storage.googleapis.com/public-rasa-application/assets/TahuSumedang.jpeg', ${TimeUtil.getDateNow()})`);
};

exports.down = (pgm) => {
  pgm.dropTable('foods');
};
