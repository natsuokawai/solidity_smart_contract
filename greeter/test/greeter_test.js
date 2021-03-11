const GreeterContract = artifacts.require("Greeter");

contract("Greeter", () => {
  it("has been deployed successfully", async () => {
    const greeter = await GreeterContract.deployed();
    assert(greeter, "contract was not deployed");
  });

  describe("greet()", () => {
    it("returns 'Hello, World!'", async () => {
      const greeter = await GreeterContract.deployed();
      const expected ="Hello, World!";

      await greeter.setGreeting(expected);
      const actual = await greeter.greet();
      assert.equal(actual, expected, "greeted with 'Hello, World!'");
    });
  });

  describe("owner()", () => {
    it("returns address of the owner", async () => {
      const greeter = await GreeterContract.deployed();
      const owner = await greeter.owner();
      assert(owner, "ther current owner");
    });
  });
});

contract("Greeter: update greeting", (accounts) => {
  describe("setGreeting(string)", () => {
    describe("when message is send by owner", () => {
      it("sets greeting to passed in string", async () => {
        const greeter = await GreeterContract.deployed();
        const expected = "Hi there!";

        await greeter.setGreeting(expected);
        const actual = await greeter.greet();
        assert.equal(actual, expected, "greeting was not updated");
      });
      it("matches the address that originally deployed the contract", async () => {
        const greeter = await GreeterContract.deployed();
        const owner = await greeter.owner();
        const expected = accounts[0];
        assert.equal(owner, expected, "matches address used to deploy contract");
      });
    });
    describe("when message is sent by another account", () => {
      it("does not set the greeting", async () => {
        const greeter = await GreeterContract.deployed();
        const expected = await greeter.greet();
        try {
          await greeter.setGreeting("Not the owner", { from: accounts[1] });
        } catch(err) {
          const errorMessage = "Ownable: caller is not the owner";
          assert.equal(err.reason, errorMessage, "greeting should not update");
          return;
        }
        assert(false, "greeting should not update");
      });
    });
  });
});
