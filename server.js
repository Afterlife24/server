// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { db } = require('./firebase');
// const { collection, addDoc, updateDoc, doc, serverTimestamp } = require('firebase/firestore');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.post("/sendOrder", async (req, res) => {
//     const { tableNumber, dishes } = req.body;
//     console.log("Received order data:", req.body);
//     const newOrder = { tableNumber, dishes, createdAt: serverTimestamp(), isDelivered: false };
//     console.log("before");
//     try {
//         console.log("after1");
        
//         await addDoc(collection(db, 'orders'), newOrder);
//         console.log("after111111");
//         res.send("Order received successfully");
//     } catch (error) {
//         res.status(500).send("Error: " + error.message);
//     }
// });

// app.post("/markAsDelivered", async (req, res) => {
//     const { orderId } = req.body;

//     try {
//         const orderDoc = doc(db, 'orders', orderId);
//         await updateDoc(orderDoc, { isDelivered: true });
//         res.send("Order marked as delivered successfully");
//     } catch (error) {
//         res.status(500).send("Error: " + error.message);
//     }
// });



// module.exports = app;

// ------------------------------------------------------------------------------------------------------------------------------------------------------


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db } = require('./firebase');
const { collection, addDoc, updateDoc, doc, serverTimestamp } = require('firebase/firestore');
i=1;
order_count = 0;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const generateRandomToken = () => {
    order_count++;
    //return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit token
    return order_count;
};


// Endpoint to send the order
app.post("/sendOrder", async (req, res) => {
    const { tableNumber, dishes } = req.body;
    const tokenId = generateRandomToken(); // Generate a four-digit token
    const newOrder = { tableNumber, dishes, createdAt: serverTimestamp(), isDelivered: false, tokenId }; // Include tokenId in the order

    try {
        // Add the order to the database
        const docRef = await addDoc(collection(db, 'orders'), newOrder);

        // Send a JSON response with the token ID
        res.status(200).json({ message: "Order received successfully", tokenId });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error.message });
    }
});

// Endpoint to mark an order as delivered
app.post("/markAsDelivered", async (req, res) => {
    const { orderId } = req.body;

    try {
        const orderDoc = doc(db, 'orders', orderId);
        await updateDoc(orderDoc, { isDelivered: true });
        res.status(200).json({ message: "Order marked as delivered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error.message });
    }
});



// Endpoint to send the token ID to another frontend
app.post("/sendTokenId", async (req, res) => {
    const { tokenId } = req.body;
    
    i++
    console.log(`Received ${i} Token ID in API endpoint: ${tokenId}`);
    try {
        const response = await fetch('https://scanme-scanme.gofastapi.com/sendTokenId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tokenId }),
        });

        // Send a JSON response to indicate the token was sent successfully
        res.status(200).json({ message: 'Token sent successfully' });
    } catch (error) {
        console.error('Error sending token to the other frontend:', error.message);
        res.status(500).json({ error: 'Error sending token to the other frontend' });
    }
});


