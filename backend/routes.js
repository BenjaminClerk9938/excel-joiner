const express = require("express");
const path = require("path");
const fs = require("fs");
const loadExcel = require("./loadExcel");
const filterPortfolio = require("./filterPortfolio");
const joinData = require("./joinData");
const saveExcel = require("./saveExcel");

const router = express.Router();

router.post("/upload", (req, res) => {
  const secFile = req.files.secFile;
  const portfolioFile = req.files.portfolioFile;

  const secPath = path.join(__dirname, "../data/sec_13f.xlsx");
  const portfolioPath = path.join(__dirname, "../data/portfolio.xlsx");

  secFile.mv(secPath, (err) => {
    if (err) return res.status(500).send(err);

    portfolioFile.mv(portfolioPath, (err) => {
      if (err) return res.status(500).send(err);

      const secList = loadExcel(secPath);
      const portfolioList = loadExcel(portfolioPath);

      const filteredPortfolio = filterPortfolio(portfolioList, secList);
      const combinedData = joinData(filteredPortfolio, secList);
      const outputPath = path.join(__dirname, "../data/combined_data.xlsx");

      saveExcel(combinedData, outputPath);

      res.json({
        message: "Files processed successfully",
        downloadPath: "/api/download",
      });
    });
  });
});

router.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "../data/combined_data.xlsx");
  res.download(filePath, "combined_data.xlsx");
});

module.exports = router;
