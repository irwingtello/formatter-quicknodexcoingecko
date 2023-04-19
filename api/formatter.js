require("dotenv").config();
const axios = require("axios");

module.exports = async (req, res) => {
  switch (req.method) {
    case "POST":
      try {
        const coins = req.body.coins;
        const currencies = req.body.currencies;

        let raw = JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "cg_simplePrice",
          params: [coins, currencies, true, true, true],
        });

        let config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        let response = await axios.post(
          process.env.RPC_URL,
          raw,
          config
        );
        // Split coins into an array
        let coinArray = coins.split(",");
        let array=[];
        // Iterate through the coins array and log each coin to the console
        for (let i = 0; i < coinArray.length; i++) {
          response.data[coinArray[i]].coin=coinArray[i];
          array.push(response.data[coinArray[i]])
        
        }   
        res.status(200).json(array);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

      break;

    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
};
