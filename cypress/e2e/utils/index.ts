export const addIngredient = (name: string) =>
  cy.get(`li:contains(${name})`).contains('Добавить').click();
