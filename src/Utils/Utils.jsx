import { useData } from "../Contexts/DataContext/DataContext";


export const filterAllProducts = () => {
    const {
      state: { filters, products }
    } = useData();
    const {
      rating,
      categoryFilter,
      brandFilter,
      price,
      trending,
      includeOutStock,
      arrangeType
    } = filters;
  const stockData = includeOutStock
    ? products
    : products.filter(({ inStock }) => inStock);

  const trendingData = trending
    ? stockData.filter(({ trending }) => trending)
    : stockData;

  const sortedCategory =
    categoryFilter.length > 0
      ? trendingData.filter((item) =>
          categoryFilter.some((category) => item.category === category)
        )
      : trendingData;

  const sortedBrands =
    brandFilter.length > 0
      ? sortedCategory.filter((item) =>
          brandFilter.some((brand) => item.brand === brand)
        )
      : sortedCategory;

  const sortRating = rating
    ? sortedBrands.filter((item) => item.rating <= rating)
    : sortedBrands;

  const sortedPrice = price
    ? sortRating.filter((product) => product.price <= price)
    : sortRating;
  
  const arrangeByPrice = arrangeType ? [...sortedPrice].sort((a,b) => arrangeType === "LTH" ? a.price - b.price : b.price - a.price) : sortedPrice;

  return arrangeByPrice;
};
