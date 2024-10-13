const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./firebase');
const { collection, addDoc, updateDoc, doc, serverTimestamp } = require('firebase/firestore');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/sendOrder", async (req, res) => {
    const { tableNumber, dishes } = req.body;
    console.log("Received order data:", req.body);
    const newOrder = { tableNumber, dishes, createdAt: serverTimestamp(), isDelivered: false };
    console.log("before");
    try {
        console.log("after1");
        
        await addDoc(collection(db, 'orders'), newOrder);
        console.log("after111111");
        res.send("Order received successfully");
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

app.post("/markAsDelivered", async (req, res) => {
    const { orderId } = req.body;

    try {
        const orderDoc = doc(db, 'orders', orderId);
        await updateDoc(orderDoc, { isDelivered: true });
        res.send("Order marked as delivered successfully");
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});



module.exports = app;

// ------------------------------------------------------------------------------------------------------------------------------------------------------


// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { db } = require('./firebase');
// const { collection, addDoc, updateDoc, doc, serverTimestamp } = require('firebase/firestore');
// const app = express();
// const corsOptions = {
//     origin: ['https://client-client.gofastapi.com', 'https://scanme-scanme.gofastapi.com'], // Replace with actual frontends
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };


// app.use(cors(corsOptions));
// app.use(bodyParser.json());



// // Endpoint to send the order
// app.post("/sendOrder", async (req, res) => {

//     const { tableNumber, dishes, tokenId } = req.body; // Receive tokenId from the request body
//     const newOrder = {
//         tableNumber,
//         dishes,
//         createdAt: serverTimestamp(),
//         isDelivered: false,
//         tokenId // Store the received tokenId in the new order
//     };

//     try {
//         // Add the order to the database
//         const docRef = await addDoc(collection(db, 'orders'), newOrder);

//         // Send a JSON response indicating success
//         console.log("Sending response:", { message: "Order received successfully", tokenId });
//         res.status(200).json({ message: "Order received successfully", tokenId });
//     } catch (error) {
//         console.error("Error storing order:", error);
//         res.status(500).json({ error: "Error: " + error.message });
//     }
// });

// // Endpoint to mark an order as delivered
// app.post("/markAsDelivered", async (req, res) => {
//     const { orderId } = req.body;

//     try {
//         const orderDoc = doc(db, 'orders', orderId);
//         await updateDoc(orderDoc, { isDelivered: true });
//         res.status(200).json({ message: "Order marked as delivered successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Error: " + error.message });
//     }
// });

// // const PORT = 5000;
// // app.listen(PORT, function() { 
// //     console.log(`Server is running on port ${PORT}`);
// // });


// module.exports = app;