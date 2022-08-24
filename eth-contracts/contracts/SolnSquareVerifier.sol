pragma solidity >=0.4.21 <0.6.0;

/* Added this line to prevent errors like the one below:
    CompileError: project:/contracts/verifier.sol:188:13: TypeError: This type is only supported in the new experimental ABI encoder. Use "pragma experimental ABIEncoderV2;" to enable the feature.
    */
pragma experimental ABIEncoderV2;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./verifier.sol";
import "./ERC721Mintable.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token
{
    using SafeMath for uint256;
    Verifier verifierContract = new Verifier();

    // Define a variable to be used as a Solution index
    uint256 solns;

    constructor() public
    {
        solns = 0;
    }

    struct Solution {
        Verifier.Proof proof; // We need a property of the type Verifier.Proof to pass later to the method verifyTx
        uint[1] input; // We will also need to pass the input parameter to the verifyTx method
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solutions {
        Solution solution; 
        uint index;
        address senderAddress;
    }

    // TODO define an array of the above struct
    Solutions[] solutionsArray;

    // TODO define a mapping to store unique solutions submitted
    mapping(uint => bool) private uniqueSolutions;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded();

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(Verifier.Proof memory proof, uint[1] memory input) public 
    {
        uint256 a = 1;
        solns.add(a);

        

        Solutions memory soln = Solutions(
            Solution(proof, input),
            solns,
            msg.sender
        );

        solutionsArray.push(soln);

        // Emit the appropiate event
        emit SolutionAdded();
    }
    
    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNft(address to, uint256 tokenId) public 
    {
        bool isUnique = false;

        for (uint256 index = 0; index < solutionsArray.length; index++) {
            if (solutionsArray[index].senderAddress == to) {

                // Make sure the solution is unique
                if (!uniqueSolutions[solutionsArray[index].index]) {
                    // Verify the solution:
                    bool verified = verifierContract.verifyTx(solutionsArray[index].solution.proof, solutionsArray[index].solution.input);
                    if (verified) {
                        uniqueSolutions[solutionsArray[index].index] = true;
                        isUnique = true;
                        break;   
                    }
                }
            }
        }

        require(isUnique, "The solution is not unique.");
        super.mint(to, tokenId);
    }
}