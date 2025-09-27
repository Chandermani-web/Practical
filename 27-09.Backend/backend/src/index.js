import "dotenv/config";
import app from "./app.js";
import connectDB from "./database/index.db.js";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to DB", err);
  });
