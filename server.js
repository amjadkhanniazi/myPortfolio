import app from './src/app.js'
import connectDB from './src/config/db.js'

const PORT=process.env.PORT || 5000;

connectDB()
.then(()=>{
    console.log('Database Connected');
    
    app.listen(PORT, ()=>{
        console.log(`server running on ${PORT}`)
    });
})
.catch((error)=>{
    console.log("MongoDB connection failed: ", error.message);
    process.exit(1);
});