var DSecret = artifacts.require("./DSecret.sol");

contract('DSecret', function(accounts) {
  it("dummy", function() {
    return DSecret.deployed().then(function(instance) {
      return instance.secrets(0);
    }).then(function(secrets) {
      console.log(secrets)
    }).catch(function(e) {
      console.log('err!', e)
    });
  });
});
