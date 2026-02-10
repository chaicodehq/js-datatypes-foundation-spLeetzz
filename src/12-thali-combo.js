/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if (
    typeof thali === "object" &&
    thali !== null &&
    thali.hasOwnProperty("name") &&
    thali.hasOwnProperty("items") &&
    thali.hasOwnProperty("price") &&
    thali.hasOwnProperty("isVeg")
  ) {
    let veg = "";
    if (thali.isVeg) {
      veg = "Veg";
    } else {
      veg = "Non-Veg";
    }

    return `${thali.name.toUpperCase()} (${veg}) - Items: ${thali.items.join(", ")} - Rs.${thali.price.toFixed(2)}`;
  }
  return "";
}

export function getThaliStats(thalis) {
  let pass = 0;
  if (Array.isArray(thalis)) {
    if (thalis.length > 0) {
      for (let i = 0; i < thalis.length; i++) {
        if (
          typeof thalis[i] === "object" &&
          thalis[i] !== null &&
          thalis[i].hasOwnProperty("name") &&
          thalis[i].hasOwnProperty("items") &&
          thalis[i].hasOwnProperty("price") &&
          thalis[i].hasOwnProperty("isVeg")
        ) {
          pass = 1;
        }
      }
      if (pass) {
        let totalThalis = thalis.length;
        let vegCount = 0;
        vegCount = thalis.filter((e) => e.isVeg).length;
        let nonVegCount = thalis.length - vegCount;
        let sum = thalis.reduce((acc, curr) => acc + curr.price, 0);
        let avgPrice = (sum / thalis.length).toFixed(2);
        let priceArr = thalis.map((e) => e.price);
        let cheapest = Math.min(...priceArr);
        let costliest = Math.max(...priceArr);
        let names = thalis.map((e) => e.name);

        return {
          totalThalis,
          vegCount,
          nonVegCount,
          avgPrice,
          cheapest,
          costliest,
          names,
        };
      }
    }
  }
  return null;
}

export function searchThaliMenu(thalis, query) {
  if (!Array.isArray(thalis) || typeof query !== "string") {
    return [];
  }
  if (query.length < 1) {
    return [];
  }

  return thalis.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.items.join().toLowerCase().includes(query.toLowerCase()),
  );
}

export function generateThaliReceipt(customerName, thalis) {
  if (typeof customerName !== "string" || !Array.isArray(thalis)) {
    return "";
  }
  if (customerName.length < 1) {
    return "";
  }
  let pass = 0;
  for (let i = 0; i < thalis.length; i++) {
    if (
      typeof thalis[i] === "object" &&
      thalis[i] !== null &&
      thalis[i].hasOwnProperty("name") &&
      thalis[i].hasOwnProperty("items") &&
      thalis[i].hasOwnProperty("price")
    ) {
      pass = 1;
    } else {
      pass = 0;
      break;
    }
  }

  if (!pass) {
    return "";
  }
  
  let len = thalis.length;
  let itemsstr = "";
  thalis.forEach((e) => {
    itemsstr += `- ${e.name} x Rs.${e.price.toFixed(2)}\n`;
  });
  let total = thalis.reduce((acc, curr) => acc + curr.price, 0).toFixed(2);

  return `THALI RECEIPT\n---\nCustomer: ${customerName.toUpperCase()}\n${itemsstr}---\nTotal: Rs.${total}\nItems: ${len}`;
}
