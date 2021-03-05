//const { use, should } = require('chai')
//const { Item } = require('react-bootstrap/lib/Breadcrumb')

const { assert } = require('chai')

const Color = artifacts.require('./Color.sol')
// importing the smart contract

require('chai') // import chai framework
    .use(require('chai-as-promised'))
    .should()


contract('Color', (accounts) => {
    // here, the accounts are going to be from Ganache
    let contract

    before(async () => { // deploying the smart contract before describe block
        contract = await Color.deployed()
    })

    describe('deployment', async () => {
        // need async because interaction with blockchain is slow
        // describe = container for test examples
        it('deploys successfully', async () => {
            // checking the address to make sure deployed on network
            const address = contract.address
            //console.log(address) // check the address
            assert.notEqual(address, 0x0) // address not equal to empty address
            assert.notEqual(address, '') // making sure address is not empty
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
        it('has a name', async () => {
            const name = await contract.name() // can check that .name() is available by looking at the dependencies (from OpenZeppelin)
            assert.equal(name, 'Color')
        })
        it('has a symbol', async () => {
            const symbol = await contract.symbol() // can check that .name() is available by looking at the dependencies (from OpenZeppelin)
            assert.equal(symbol, 'COLOR')
        })
    })

    describe('minting', async () => {

        it('creates a new token', async () => {
            const result = await contract.mint('#EC058E')
            const totalSupply = await contract.totalSupply() // function that already exists and tells how many tokens already exist
            // SUCCESS
            assert.equal(totalSupply, 1) // cf, when mint one token, you now have one token in minted supply.
            console.log(result)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct') // first minted = from first = from empty address!
            assert.equal(event.to, accounts[0], 'to is correct') // accounts from Ganache, here checking that it goes to first Ganache accounts
        })

    })

})
