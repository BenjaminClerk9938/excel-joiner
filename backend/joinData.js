function joinData(filteredPortfolio, secList) {
  return filteredPortfolio.map((item) => {
    const secItem = secList.find((secItem) => secItem.CUSIP_NO === item.CUSIP);

    return {
      NameOfIssuer: secItem["ISSUER NAME"],
      TitleOfClass: secItem["ISSUER_DESCRIPTION"],
      CUSIP: item.CUSIP,
      FIGI: "",
      Value: parseInt(item["Market Value"]),
      Shares: parseInt(item["Trade Date Quantity"]),
      SharesOrPrincipal: "SH",
      PutOrCall: "",
      InvestmentDiscretion: "SOLE",
      OtherManagers: "",
      Sole: 0,
      Shared: 0,
      None: parseInt(item["Trade Date Quantity"]),
    };
  });
}

module.exports = joinData;
