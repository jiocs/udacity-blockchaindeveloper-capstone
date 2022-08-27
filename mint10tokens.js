// BASE:
// https://github.com/ProjectOpenSea/opensea-creatures/blob/master/scripts/mint.js

// Adapt
const HDWalletProvider = require("truffle-hdwallet-provider");
const web3 = require("web3");
const MNEMONIC = "bus drama alter few lecture shrug record strategy fox corn waste safe";
const NODE_API_KEY = "0361e9ca422e4bce8150c3bd1e626c43";
const FACTORY_CONTRACT_ADDRESS = "0x00462873f5eD6bE57ee6E1C0E9e6aaA42Ba5fFb2";
const NFT_CONTRACT_ADDRESS = "0x00462873f5eD6bE57ee6E1C0E9e6aaA42Ba5fFb2";
const OWNER_ADDRESS = "0xf3E3Cf87CC0b3b00073Beb369706969C81A4E8a6";
const NETWORK = "rinkeby";
const NUM_PROPERTIES = 10;
const fs = require('fs');

console.log('Minting 10 tokens...');


// if (!MNEMONIC || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
//   console.error(
//     "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
//   );
//   return;
// }

const NFT_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
    ],
    name: "mintTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];


async function main() {
    const network = NETWORK;
    const provider = new HDWalletProvider(MNEMONIC, "https://" + network + ".infura.io/v3/" + NODE_API_KEY);
    const web3Instance = new web3(provider);
    
    var ABI = JSON.parse(fs.readFileSync('eth-contracts\\build\\contracts\\SolnSquareVerifier.json'));
    var FACTORY_ABI = ABI.abi;

//   console.log('Factory ABI:');
//   console.log(FACTORY_ABI);

    // Import the 10 proofs created with zokrates:

    let _proofs = Array(
        'zokrates\\code\\square\\proof123.json',
        'zokrates\\code\\square\\proof124.json',
        'zokrates\\code\\square\\proof125.json',
        'zokrates\\code\\square\\proof126.json',
        'zokrates\\code\\square\\proof127.json',
        'zokrates\\code\\square\\proof128.json',
        'zokrates\\code\\square\\proof129.json',
        'zokrates\\code\\square\\proof130.json',
        'zokrates\\code\\square\\proof131.json',
        'zokrates\\code\\square\\proof132.json'
        );

    if (FACTORY_CONTRACT_ADDRESS) {
        const factoryContract = new web3Instance.eth.Contract(
            FACTORY_ABI,
            FACTORY_CONTRACT_ADDRESS,
            { gasLimit: "1000000" }
        );

        // Creatures issued directly to the owner.
        for (var i = 0; i < NUM_PROPERTIES; i++) {
            // Load proof
            let _proof = await JSON.parse(fs.readFileSync(_proofs[i]));

            // Prepare the proof argument to match the Struct defined in verifier.sol:
            let proof = {
                a: _proof.proof.a,
                b: _proof.proof.b,
                c: _proof.proof.c
            };

            // Add the solution
            const solnResult = await factoryContract.methods
                .addSolution(proof, _proof.inputs)
                .send({from:OWNER_ADDRESS});

            const result = await factoryContract.methods
                .mint(OWNER_ADDRESS, i)
                .send({ from: OWNER_ADDRESS });

            console.log("Minted property. Transaction: " + result.transactionHash);
        }
    } else if (NFT_CONTRACT_ADDRESS) {
        const nftContract = new web3Instance.eth.Contract(
        NFT_ABI,
        NFT_CONTRACT_ADDRESS,
        { gasLimit: "1000000" }
        );

        // Creatures issued directly to the owner.
        for (var i = 0; i < NUM_PROPERTIES; i++) {
        const result = await nftContract.methods
            .mintTo(OWNER_ADDRESS)
            .send({ from: OWNER_ADDRESS });
        console.log("Minted creature. Transaction: " + result.transactionHash);
        }
    } else {
        console.error(
        "Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables"
        );
    }
}

main();