import { addIngredient } from './utils';

describe('Тесты на конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });

    cy.visit('/');
  });

  it('Добавление булки в конструктор', () => {
    const bunName = 'Краторная булка N-200i';

    addIngredient(bunName);

    cy.get('[data-cy=ConstructorElementTop]').should(
      'contain',
      `${bunName} (верх)`
    );
    cy.get('[data-cy=ConstructorElementBottom]').should(
      'contain',
      `${bunName} (низ)`
    );
  });

  it('Добавление начинки в конструктор', () => {
    const mainName = 'Биокотлета из марсианской Магнолии';

    addIngredient(mainName);

    cy.get('[data-cy=ConstructorElement]').should('contain', mainName);
  });

  it('Добавление соуса в конструктор', () => {
    const sauceName = 'Соус Spicy-X';

    addIngredient(sauceName);

    cy.get('[data-cy=ConstructorElement]').should('contain', sauceName);
  });
});
