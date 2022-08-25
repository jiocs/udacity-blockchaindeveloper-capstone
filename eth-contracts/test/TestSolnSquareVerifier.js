// Call SolnSquareVerifier artifact
var Verifier = artifacts.require("SolnSquareVerifier");
var fs = require("fs");


contract('SolnSquareVerifier', accounts => {
    beforeEach(async function() {
        // Create an instance of the contract like in other test files:
        // this.contract = await ERC721MintableComplete.new({from: account_one});
        this.contract = await Verifier.new();
    });

    // Test if a new solution can be added for contract - SolnSquareVerifier
    it('Test if a new solution can be added for contract', async function() {
        let eventEmitted = false;

        // Read the proof created with zokrates (copied to this scoped environment)
        let _proof = await JSON.parse(fs.readFileSync(".\\test\\proof.json"));

        // Prepare the proof argument to match the Struct defined in verifier.sol:
        // struct Proof {
        //     Pairing.G1Point a;
        //     Pairing.G2Point b;
        //     Pairing.G1Point c;
        // }
        let proof = {
            a: _proof.proof.a,
            b: _proof.proof.b,
            c: _proof.proof.c
        };

        // Watch the SolutionAdded event
        this.contract.SolutionAdded({}, function(err, res) {
            eventEmitted = true;
        });

        try {
            // Try to call the method to add the solution
            // function addSolution(Verifier.Proof memory proof, uint[1] memory input) public
            await this.contract.addSolution(proof, _proof.inputs);
        } catch (error) {
            console.log(error);
        }
        
        assert.equal(eventEmitted, true, "SolutionAdded event NOT emitted");
    });
});


// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
