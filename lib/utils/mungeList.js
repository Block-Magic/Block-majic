const mungeList = (list) => {
  const mungedData = list.map((item) => {
    return {
      name: item.name,
      symbol: item.symbol,
      price: item.quote.USD.price,
    };
  });

  return mungedData;
};

module.exports = {
  mungeList
};
