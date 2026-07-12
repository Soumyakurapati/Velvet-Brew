import dotenv from "dotenv";
import connectDB from "../config/db.js";
import MenuItem from "../models/MenuItem.js";

dotenv.config();
await connectDB();

const items = [
  // COFFEE
  { name: "Signature espresso", category: "coffee", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&h=350&q=80&fit=crop", price: 199, rating: 4.8, isSignature: true, ingredients: ["Espresso beans"], description: "House blend, bold and rounded, pulled to order" },
  { name: "Classic latte", category: "coffee", image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=500&h=350&q=80&fit=crop", price: 229, rating: 4.6, ingredients: ["Espresso", "Steamed milk"], description: "Smooth espresso balanced with silky steamed milk" },
  { name: "Cappuccino", category: "coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&h=350&q=80&fit=crop", price: 219, rating: 4.7, ingredients: ["Espresso", "Milk foam"], description: "Equal parts espresso, milk, and airy foam" },
  { name: "Mocha", category: "coffee", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&h=350&q=80&fit=crop", price: 249, rating: 4.6, ingredients: ["Espresso", "Dark chocolate", "Milk"], description: "Espresso and steamed milk with rich dark chocolate" },
  { name: "Iced cold coffee", category: "coffee", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=350&q=80&fit=crop", price: 229, rating: 4.5, ingredients: ["Cold brew", "Milk", "Ice"], description: "Chilled and smooth, brewed slow for 18 hours" },
  { name: "Hazelnut frappe", category: "coffee", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&h=350&q=80&fit=crop", price: 259, rating: 4.7, ingredients: ["Espresso", "Hazelnut syrup", "Ice"], description: "Blended, frothy, finished with a hazelnut drizzle" },

  // BEVERAGES
  { name: "Virgin mojito", category: "beverages", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&h=350&q=80&fit=crop", price: 219, rating: 4.6, ingredients: ["Mint", "Lime", "Soda"], description: "Fresh mint and lime over soda, served ice cold" },
  { name: "Passionfruit spritz", category: "beverages", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&h=350&q=80&fit=crop", price: 249, rating: 4.5, ingredients: ["Passionfruit", "Soda", "Lime"], description: "Tropical and tart, a bright non-alcoholic spritz" },
  { name: "Fresh orange juice", category: "beverages", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&h=350&q=80&fit=crop", price: 179, rating: 4.4, ingredients: ["Orange"], description: "Cold-pressed, no added sugar" },
  { name: "Watermelon cooler", category: "beverages", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&h=350&q=80&fit=crop", price: 189, rating: 4.5, ingredients: ["Watermelon", "Mint", "Lime"], description: "Chilled watermelon juice with a hint of mint" },
  { name: "Masala chai", category: "beverages", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&h=350&q=80&fit=crop", price: 149, rating: 4.7, ingredients: ["Tea leaves", "Spices", "Milk"], description: "Slow-brewed with cardamom, ginger, and cinnamon" },
  { name: "Earl grey", category: "beverages", image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=500&h=350&q=80&fit=crop", price: 159, rating: 4.4, ingredients: ["Black tea", "Bergamot"], description: "Classic bergamot-scented black tea" },
  { name: "Belgian chocolate milkshake", category: "beverages", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&h=350&q=80&fit=crop", price: 269, rating: 4.8, ingredients: ["Belgian chocolate", "Milk", "Ice cream"], description: "Thick, rich, and generously topped" },
  { name: "Cookies & cream milkshake", category: "beverages", image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=500&h=350&q=80&fit=crop", price: 259, rating: 4.6, ingredients: ["Cookies", "Cream", "Ice cream"], description: "Blended cookie crumble with vanilla ice cream" },

  // MAINS
  { name: "Truffle mushroom pasta", category: "mains", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500&h=350&q=80&fit=crop", price: 449, rating: 4.7, isSignature: true, ingredients: ["Wild mushrooms", "Truffle oil", "Parmesan", "Fettuccine"], description: "Fettuccine tossed in a creamy truffle mushroom sauce" },
  { name: "Arrabbiata penne", category: "mains", image: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=500&h=350&q=80&fit=crop", price: 399, rating: 4.5, ingredients: ["Penne", "Tomato", "Chili", "Basil"], description: "Spicy tomato sauce, fresh basil, al dente penne" },
  { name: "Margherita pizza", category: "mains", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=350&q=80&fit=crop", price: 429, rating: 4.6, ingredients: ["Mozzarella", "Tomato", "Basil"], description: "Classic wood-fired pizza, San Marzano tomatoes" },
  { name: "Smoked BBQ chicken pizza", category: "mains", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=350&q=80&fit=crop", price: 479, rating: 4.7, ingredients: ["Chicken", "BBQ sauce", "Mozzarella", "Onion"], description: "Smoky barbecue chicken over a crisp thin crust" },
  { name: "Velvet gourmet burger", category: "mains", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=350&q=80&fit=crop", price: 399, rating: 4.8, isSignature: true, ingredients: ["Beef patty", "Brioche bun", "Cheddar", "Caramelized onion"], description: "House-ground patty, aged cheddar, brioche bun" },
  { name: "Grilled veg sandwich", category: "mains", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&h=350&q=80&fit=crop", price: 289, rating: 4.4, ingredients: ["Grilled vegetables", "Pesto", "Sourdough"], description: "Char-grilled vegetables, pesto, toasted sourdough" },
  { name: "Cheesy garlic bread", category: "mains", image: "https://images.unsplash.com/photo-1556008531-57e6eefc7be4?w=500&h=350&q=80&fit=crop", price: 219, rating: 4.6, ingredients: ["Baguette", "Garlic butter", "Mozzarella"], description: "Oven-baked, oozing with garlic butter and cheese" },
  { name: "Truffle parmesan fries", category: "mains", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&h=350&q=80&fit=crop", price: 249, rating: 4.7, ingredients: ["Potato", "Truffle oil", "Parmesan"], description: "Hand-cut fries finished with truffle and parmesan" },
  { name: "Burrata & heirloom tomato salad", category: "mains", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&h=350&q=80&fit=crop", price: 379, rating: 4.6, ingredients: ["Burrata", "Heirloom tomato", "Basil oil"], description: "Fresh burrata, basil oil, aged balsamic" },
  { name: "Avocado sourdough breakfast", category: "mains", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&h=350&q=80&fit=crop", price: 329, rating: 4.5, ingredients: ["Sourdough", "Avocado", "Poached egg", "Chili flakes"], description: "Smashed avocado, poached egg, toasted sourdough" },

  // DESSERTS
  { name: "Sizzling brownie", category: "desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&h=350&q=80&fit=crop", price: 349, rating: 4.9, isSignature: true, ingredients: ["Dark chocolate", "Vanilla ice cream"], description: "Molten centre, vanilla bean, served on a cast-iron plate" },
  { name: "Classic New York cheesecake", category: "desserts", image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=500&h=350&q=80&fit=crop", price: 299, rating: 4.6, ingredients: ["Cream cheese", "Biscuit base", "Berry compote"], description: "Baked cheesecake with a buttery biscuit base" },
  { name: "Chocolate lava cake", category: "desserts", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=350&q=80&fit=crop", price: 289, rating: 4.8, ingredients: ["Dark chocolate", "Butter", "Eggs"], description: "Warm cake with a molten chocolate centre" },
  { name: "Double chocolate chip cookie", category: "desserts", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=350&q=80&fit=crop", price: 149, rating: 4.5, ingredients: ["Chocolate chips", "Butter", "Brown sugar"], description: "Warm, gooey, baked fresh in-house" },
  { name: "Tiramisu jar", category: "desserts", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&h=350&q=80&fit=crop", price: 289, rating: 4.7, ingredients: ["Espresso", "Mascarpone", "Ladyfingers"], description: "Espresso-soaked ladyfingers, mascarpone, cocoa dust" },

  // ICE CREAMS
  { name: "Saffron kulfi swirl", category: "icecreams", image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&h=350&q=80&fit=crop", price: 279, rating: 4.8, isSignature: true, ingredients: ["Milk", "Saffron", "Pistachio"], description: "House-churned, pistachio dust, Kashmiri saffron" },
  { name: "Belgian chocolate scoop", category: "icecreams", image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=500&h=350&q=80&fit=crop", price: 249, rating: 4.6, ingredients: ["Belgian chocolate", "Cream"], description: "Dark couverture chocolate, sea salt finish" },
  { name: "Madagascar vanilla bean", category: "icecreams", image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=500&h=350&q=80&fit=crop", price: 229, rating: 4.5, ingredients: ["Vanilla bean", "Cream"], description: "Slow-churned with real Madagascar vanilla" },
  { name: "Salted caramel pecan", category: "icecreams", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&h=350&q=80&fit=crop", price: 259, rating: 4.7, ingredients: ["Caramel", "Pecan", "Sea salt"], description: "Buttery caramel swirl with roasted pecans" },
];

await MenuItem.deleteMany();
await MenuItem.insertMany(items);
console.log(`Seed data inserted — ${items.length} menu items added`);
process.exit();
