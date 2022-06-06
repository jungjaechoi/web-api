import "./db.js";
import app from "./server.js"

const PORT = 5000;//암묵적으로 4000사용

const handleLsn = () => 
console.log(`✅ Server listening on port http://localhost:${PORT}🚀`);

app.listen(5000, handleLsn);