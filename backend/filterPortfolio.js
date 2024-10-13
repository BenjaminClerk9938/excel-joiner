function filterPortfolio(portfolioList, secList) {
  return portfolioList.filter((item) => {
    return secList.some(
      (secItem) =>
        secItem.CUSIP_NO === item.CUSIP &&
        item["Market Value"] > 200000 &&
        item["Trade Date Quantity"]>10000
    );
  });
}

module.exports = filterPortfolio;
