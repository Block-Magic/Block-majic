**Block-majic******

**Team Members**

1. Carolyn Fleming
2. Cadillac Jack 
3. Phillipe Ngom
4. Pete Seeling


**Description**

Block Majic is a fully functional built from scratch Blockchain that utilizes the proof of work method of validation. 

This app allows users to send and receive tokens, see the total amount of all sent transactions, get all their transactions, as well as check their wallet balance. 

The app also hits the CoinBase API to fetch a list of the top 10 crypto currencies by market cap.

Every transaction contains a sender Id, receiver Id, amount, timestamp and a sender signature. The transaction requires the sender to validate the transaction by signing it. Once ten transactions have been made a new block is mined. 

Every block contains 10 transactions and is validated by checking the current blocks hash against the previous blocks hash. Once a block is validated it is added to the blockchain. 

If a block is tampered with it will change the blocks hash and it will lose its validation and no longer be accepted. 

	
**Database**

The Block Majic database is made up of 4 tables.

—Users Table—
Consists of the the Users email, password and UID.

—Profiles Table—
Contains the Users UID, ID, Key Pair, public key, private key and Users Wallet Balance.

—Transactions Table—
Contains the ID, transaction timestamp, transaction amount, sender Id, receiver Id, and sender signature.

—Ledger Table—
Consists of the previous blocks hash, current blocks hash, block timestamp, transactions contained in the block and ID.


**API**

Block Majics third party API hits the CoinBase.com API. This is done to allow the fetching of the top 10 cryptocurrencies by market cap. 


**Backend**

The backend of the app allows the user to send and receive tokens, get all their transactions, see the total amount of all tokens sent, as well as check their wallet balance. The user can also fetch a list of the top 10 crypto currencies from CoinBase based on market cap.
