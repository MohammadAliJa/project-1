import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
dotenv.config({
    path: "./.env"
});

const startServer = async() =>{
    try{
        console.log("MongoDB URI:", process.env.MONGODB_URI);
        await connectDB();

        app.on("error", (error) =>{
            throw new Error('Error', error);

        })

        app.listen(process.env.PORT || 8000, ()=>{   
            console.log(`Server is running on port 
                ${process.env.PORT || 8000}`);
        });
    }
    catch(error){
        console.error("Error starting the server", error);
    }
}

startServer();