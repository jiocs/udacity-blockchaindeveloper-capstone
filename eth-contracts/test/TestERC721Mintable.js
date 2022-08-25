// From Rubric: 
// Student writes and passes the test cases in TestERC721Mintable.js

var ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens (Mint 10 tokens)
            this.tokens = new Array(1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010);
            for (let index = 0; index < this.tokens.length; index++) {
                await this.contract.mint(account_one, this.tokens[index]);
            }
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, this.tokens.length, "Incorrect total supply return value.");
        })

        it('should get token balance', async function () { 
            let tokenBalance = await this.contract.balanceOf(account_one);
            assert.equal(tokenBalance, this.tokens.length, "Incorrect token balance.");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            //function baseTokenURI() external view returns(string memory) {
            let _baseTokenURI = await this.contract.baseTokenURI();

            let _token = this.tokens[1];
            let _tokenUri = _baseTokenURI + _token;

            // function tokenURI(uint256 tokenId) external view returns (string memory) {
            let tokenUri = await this.contract.tokenURI(_token);

            assert(tokenUri, _tokenUri, "Incorrect token URI");
        })

        it('should transfer token from one owner to another', async function () { 
            // function transferFrom(address from, address to, uint256 tokenId) public {
            await this.contract.transferFrom(account_one, account_two, this.tokens[0]);

            // Watch the emit Transfer(address(0), to, tokenId) event
            var emittedEvent = false;
            this.contract.Transfer({}, function(err, res) {
                eventEmitted = true;
            });

            let newOwner = await this.contract.ownerOf(this.tokens[0]);

            // Check if the owner is correct
            assert.equal(newOwner, account_two, "Owner didn't change.");
            
            // Check if the Transfer event was emitted
            assert.equal(eventEmitted, true, "Transfer event was not emitted");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let failed = false;
            let tokenId = 2000;
            
            try {
                // from contract: function mint(address to, uint256 tokenId) public onlyOwner returns(bool)
                let result = await this.contract.mint(account_one, tokenId, {from: account_two});
            } catch (error) {
                failed = true;
            }

            assert.equal(failed, true, "Didn't fail when minting to address that is not contract owner")
        })

        it('should return contract owner', async function () { 
            let contractOwner = await this.contract.contractOwner();
            assert.equal(contractOwner, account_one, "Account one is not the contract owner.");
        })
    });
})