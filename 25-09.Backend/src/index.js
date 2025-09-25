import 'dotenv/config';
import app from './app.js';
import connectDb from './database/db.js';

const PORT = process.env.PORT || 8000;

connectDb()
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
})
.catch((err)=>{
    console.error("Error in database connection", err);
    process.exit(1);
});