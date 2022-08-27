# Udacity blockchain developer nanodegree capstone project

# How to run the tests:

To test the code run the command   truffle test

Considerations: 

a) truffle config is set to lookup for Ganache or Truffle development environment at http://127.0.0.1:7545

b) The truffle tests files are located under the \test folder

# Contracts ABI's
The contracts ABI's are located at the \eth-contracts\build\contracts folder

# Rinkeby addresses: 

Account: 0xf3E3Cf87CC0b3b00073Beb369706969C81A4E8a6
Migrations: 0x38FE89f950f888E1fd0081ea950fDB908F9F2E91
SolnSquareVerifier:  0x00462873f5eD6bE57ee6E1C0E9e6aaA42Ba5fFb2
CustomERC721Token: 0xBcd94CA5e3a68A084dbF9591FBBB801DdA82d47A
Verifier: 0xC550C29D32742B530B4fAabA4f4f7f2603fBEC67

# Tesnets OpenSea collection:

https://testnets.opensea.io/collection/jios-properties

# Minting tokens: 

Steps I followed to mint the 10 tokens: 

1. 10 proofs were generated with zokrates for the inputs below: 

123 15129
124 15376
125 15625
126 15876
127 16129
128 16384
129 16641
130 16900
131 17161
132 17424


2. Run mint10tokens.js from root folder with the command:   node mint10tokens.js

Output: 

Minting 10 tokens...
Minted property. Transaction: 0x6ac764db58b40b887550426ff8396007ec5b58ca62534265573d5117ae2d4eaa
Minted property. Transaction: 0xabba7c9495954e681717b5dd4a03ef3d2d8eb7309e032306e94ef0683377fcbb
Minted property. Transaction: 0x636e014e82cb20d2d3b4e9f7e52caca54cd40a9f62d4b0230247fc8d2c0be3e6
Minted property. Transaction: 0xf220d729be9fa8b9ba614cb2fb4d35ea14cebff24ab681f47ef9a8d65dea636c
Minted property. Transaction: 0xf1f36e5c23bb0540f223e444e3f60887141140d591432b973adf02790b5b1a32
Minted property. Transaction: 0x041343245d03dbfcfcf8bb5a1a1e1756beb8e478d0bb3dc69376472435209664
Minted property. Transaction: 0x1b804197ff4917bdee6ae9dc8b527fd2b665fad86663c66f4dc1d9c7f2a915d0
Minted property. Transaction: 0x8f503a7b0a82e8f53a87cd96c9272f48ff0e2d3dbd70bb3634e04919c4c26675
Minted property. Transaction: 0xae47f905daf05bc410eef55adc15d0eb0eabe6304b53d9cfa1694471ad6d7f4a
Minted property. Transaction: 0x415c2888d4674c6ac307d510f85fc614591a490dea359162017308b091b81b7b


# 5 items from the OpenSea collection were listed and purchased with the account: 

0x856E9fe6cB3D60304bD1947D9EbAB32c1994172a

# Transactions:

0xe93ba27b5e098f6e6df35635b3db3f123fb01eba15e80526a6f18177ca4cfd63
0x44df46e5019d39f71e8dbc5ca4f0bb46981b417bd166d0a922972bf2564defc5
0xa8068ab87a7689049f508d211ef500e1b09d615cdfa6e4aae6367c6551193c63
0x99c02beda6d7794cd52ec1aa61ed00175e795a2294af29f04de123123d3a5b85
0xf524faf8593f82dbbbe797de60f41685c577351b86506bc3b3d7fe025482e8f8



