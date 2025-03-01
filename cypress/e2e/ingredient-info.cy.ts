describe('Тесты на отображение информации ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });

    cy.visit('/');
  });

  it('Открытие и закрытие модального окна на крестик', () => {
    cy.get('#modals').should('be.empty');

    cy.contains('Краторная булка N-200i').click();

    cy.get('#modals').should('not.be.empty');

    cy.get('[data-cy=ModalCloseButton]').click();

    cy.get('#modals').should('be.empty');
  });

  it('Открытие и закрытие модального окна на оверлей', () => {
    cy.get('#modals').should('be.empty');

    cy.contains('Краторная булка N-200i').click();

    cy.get('#modals').should('not.be.empty');

    cy.get('[data-cy=ModalOverlay]').click({ force: true });

    cy.get('#modals').should('be.empty');
  });
});
