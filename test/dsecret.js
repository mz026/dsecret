var DSecret = artifacts.require("./DSecret.sol");

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

})
