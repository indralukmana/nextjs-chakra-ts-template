/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (name: string) => {
	const login = () => {
		cy.visit('/');
		cy.findByLabelText('Username').type('admin');
		cy.findByLabelText('Password').type('password');
		cy.findByText('Login').realClick();

		cy.contains('Login berhasil').should('be.visible');
		cy.url({ timeout: 10_000 }).should('include', '/dashboard');
	};

	cy.session(name, login);
});

Cypress.Commands.add('getRandomInt', (min: number, max: number) => {
	return cy.wrap(Math.floor(Math.random() * (max - min + 1)) + min);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
	namespace Cypress {
		interface Chainable {
			login(name: string): Chainable<void>;
			getRandomInt(min: number, max: number): Chainable<number>;
			// drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
			// dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
			// visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
		}
	}
}

import '@testing-library/cypress/add-commands';

export { };
