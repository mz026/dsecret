var DSecret = artifacts.require("./DSecret.sol");

function promisify (func) {
  return function(...args) {
    return new Promise((resolve, reject)=> {
      func(...args, (err, res)=> {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
}

contract('DSecret', function(accounts) {
  let instance
  const deploy = async ()=> {
    instance = await DSecret.new()
  }
  beforeEach(deploy)

  describe('#getSecrets(_fromIdx, _toIdx)', () => {
    it("retrieves the secret detail", async function() {
      await instance.createSecret('the-content', 'the-summary', { value: 100 })
      await instance.createSecret('the-content-2', 'the-summary-2', { value: 50 })

      let [content, summary, price] = await instance.getSecret.call(1)
      expect(content).to.equal('the-content-2')
      expect(price.toNumber()).to.equal(50)
    })
    it('returns nil if index not found', async function() {
      await instance.createSecret('the-content', 'the-summary', { value: 100 })

      let [content, summary, price] = await instance.getSecret.call(10)

      expect(content).to.equal('')
      expect(summary).to.equal('')
      expect(price.toNumber()).to.equal(0)
    })
  })

  describe('#getSecretCount()', () => {
    it('returns secret count', async () => {
      await instance.createSecret('the-content', 'the-summary', { value: 100 })

      let count = await instance.getSecretCount.call()

      expect(count.toNumber()).to.equal(1)
    })
  })

  describe.only('#peek(index)', () => {
    let owner = accounts[0]
    let peeker = accounts[1]
    it('sends the amount to the secret owner', async () => {
      await instance.createSecret(
        'the-content',
        'the-summary',
        { from: owner, value: 100 }
      )
      let initOwnerBalance = await web3.eth.getBalance(owner)
      let initPeekerBalance = await web3.eth.getBalance(peeker)

      let rec = await instance.peek(0, { from: peeker, value: 110 })
      let tx = await web3.eth.getTransaction(rec.tx)

      let laterOwnerBalance = await web3.eth.getBalance(owner)
      let laterPeekerBalance = await web3.eth.getBalance(peeker)

      expect(laterOwnerBalance.minus(initOwnerBalance).toNumber()).to.equal(110)
      expect(initPeekerBalance.minus(laterPeekerBalance).minus(tx.gasPrice.mul(rec.receipt.cumulativeGasUsed)).toNumber()).to.equal(110)
    })
    it('adds up the price of the secret', async () => {
      await instance.createSecret(
        'the-content',
        'the-summary',
        { from: owner, value: 100 }
      )

      await instance.peek(0, { from: peeker, value: 110 })
      let [content, summary, price] = await instance.getSecret.call(0)

      expect(price.toNumber()).to.equal(110)
    })
    it('enables user to see the peeked secret', () => {
      //test codes here
    })
    it('splits the amount between the peekers and owner', () => {
      //test codes here
    })
  })
})
