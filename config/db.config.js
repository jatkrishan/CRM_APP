module.exports = {
   DB_NAME: "crm_db",
  DB_URL: process.env.MONGODB_URI  || "mongod://127.0.0.1/crm_db"
   // DB_URL: "mongod://localhost/crm_db"
   //   DB_URL: "mongodb+srv://krishanchoudhary43:8432033943@crm-db.tfx8qqw.mongodb.net/"
} 
