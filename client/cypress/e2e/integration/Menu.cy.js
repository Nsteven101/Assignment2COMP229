describe("NavBarTest 7/29/2025 at 1:21:22 AM", () => {
  it("tests NavBarTest 7/29/2025 at 1:21:22 AM", () => {
    cy.viewport(896, 695);
    cy.visit("http://localhost:3000/");
    cy.get("nav > a:nth-of-type(2)").click();
    cy.get("a:nth-of-type(3)").click();
    cy.get("a:nth-of-type(5)").click();
    cy.get("a:nth-of-type(4)").click();
    cy.get("a:nth-of-type(6)").click();
  });
});
//# recorderSourceMap=BCBDBEBFBGBHBIB
