var DSecret = artifacts.require("./DSecret.sol");

contract('DSecret', function(accounts) {
  it("dummy", async function() {
    let instance = await DSecret.deployed()
    await instance.createSecret('the-content', 'the-summary')
    await instance.createSecret('the-content-2', 'the-summary-2')
    let ret = await instance.getSecret.call(0)
    ret.forEach((r)=> {
      console.log(web3.toAscii(r))
    })
  });
});
