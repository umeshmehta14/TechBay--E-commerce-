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
  },
  {
    _id: uuid(),
    categoryName: "Laptop",
  },
  {
    _id: uuid(),
    categoryName: "Headphone",
  },
  {
    _id: uuid(),
    categoryName: "Speaker",
  },
  {
    _id: uuid(),
    categoryName: "Television",
  },
  {
    _id: uuid(),
    categoryName: "Tablet",
  },
];
