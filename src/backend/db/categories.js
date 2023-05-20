import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */
// smartphones: 5,
// laptop: 11,
// television: 9,
// speaker: 8,
// headphones: 10,
// tablets: 1

export const categories = [
  {
    _id: uuid(),
    categoryName: "Smartphone",
    image: "https://tse2.explicit.bing.net/th?id=OIP.6slSa8HsFP11adHk0lStWAHaHa&pid=Api&P=0&h=180"
  },
  {
    _id: uuid(),
    categoryName: "Laptop",
    image:"https://tse3.mm.bing.net/th?id=OIP.zm3Qz7wKiqTaZy9qPrhbcAHaG0&pid=Api&P=0"
  },
  {
    _id: uuid(),
    categoryName: "Headphone",
    image:"https://tse2.mm.bing.net/th?id=OIP.hXDZ1NSBBnsiDa07WObLbAHaHa&pid=Api&P=0"
  },
  {
    _id: uuid(),
    categoryName: "Speaker",
    image:"https://tse1.mm.bing.net/th?id=OIP.1ZwLkjTMk1RHc6m5dDRYMAHaHa&pid=Api&P=0"
  },
  {
    _id: uuid(),
    categoryName: "Television",
    image:"https://tse1.mm.bing.net/th?id=OIP.35GmgMyAqRYBTbgMAcPNoQHaFY&pid=Api&P=0"
  },
  {
    _id: uuid(),
    categoryName: "Tablet",
    image:"https://tse3.mm.bing.net/th?id=OIP.rRFzDtIKsJe33bVbZsp4pAHaFM&pid=Api&P=0"
  },
];
