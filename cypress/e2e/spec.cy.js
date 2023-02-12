/// <reference types="cypress" />
/* eslint-disable no-undef */

describe("template spec", () => {
    it("passes", () => {
        cy.visit("http://localhost:3000/habit-tracker#/SignIn");
        cy.get(".MuiButtonBase-root").click();
        cy.get(":nth-child(1) > .MuiPaper-root").click();
    });
});
