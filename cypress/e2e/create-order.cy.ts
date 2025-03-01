import { addIngredient } from './utils';

describe('Тесты на оформление заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', '/api/auth/login', { fixture: 'user.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });

    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');
    cy.visit('/');
  });

  it('Оформление заказа', () => {
    addIngredient('Краторная булка N-200i');
    addIngredient('Биокотлета из марсианской Магнолии');
    addIngredient('Соус Spicy-X');

    cy.get('button:contains(Оформить заказ)').click();

    cy.get('[data-cy=ModalCloseButton]').click();

    cy.get('[data-cy=ConstructorElementTop]').should(
      'contain',
      'Выберите булки'
    );
    cy.get('[data-cy=ConstructorElement]').should(
      'contain',
      'Выберите начинку'
    );
    cy.get('[data-cy=ConstructorElementBottom]').should(
      'contain',
      'Выберите булки'
    );
  });
});
