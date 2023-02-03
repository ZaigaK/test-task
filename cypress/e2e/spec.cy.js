const longenesis_url = 'https://engage.longenesis.com/'

describe('Registration', () => {
  it('#AT_01_Tests successful registration', () => {
    const email = `${new Date().getTime()}@aaaaaa.com`;
    const password = 'Parole345'

    //visit longenesis portal
    cy.visit(longenesis_url)

    //find Login button
    cy.get('#login_from_menu').click()

    //find Sign up now and click it
    cy.get('a').contains('Sign up now').click()

    //fill in email and check if the value is filled in
    cy.get('#email').type(email).should('have.value',email)

    //create password
    cy.get('#password').type(password).should('have.value', password)

    //confirm password
    cy.get('#password-confirm').type(password).should('have.value',password)

    //find sign up button and click it
    cy.get('.btn--submit').click()

    //agree to terms and conditions (checkbox)
    cy.get('.v-input--selection-controls__ripple').click()

    //click Accept
    cy.get('#accept_terms_button').click()

    //validate that you are registrated and logged in by checking if there is Logout button
    cy.get('#logout_from_menu')
  })

  it('#AT_02_Tests unsuccessful registration - email already exists', () => {
    const email = 'aaaa@aaa.com';
    const password = 'Parole345';

    cy.visit(longenesis_url)
    cy.get('#login_from_menu').click()
    cy.get('a').contains('Sign up now').click()
    cy.get('#email').type(email).should('have.value',email)
    cy.get('#password').type(password).should('have.value',password)
    cy.get('#password-confirm').type(password).should('have.value',password)
    cy.get('.btn--submit').click()
    cy.get('#input-error-email')
  })

  it('#AT_03_Tests unsuccessful registration - passwords do not match', () => {
    const email = 'abcd@aaa.com';
    const parole = 'Parole345';
    const parole2 = 'Parole3457';

    cy.visit(longenesis_url)
    cy.get('#login_from_menu').click()
    cy.get('a').contains('Sign up now').click()
    cy.get('#email').type(email).should('have.value',email)
    cy.get('#password').type(parole).should('have.value',parole)
    cy.get('#password-confirm').type(parole2).should('have.value', parole2)
    cy.get('.btn--submit').click()
    cy.get('#input-error-password-confirm')
  
  })
})


describe('Authentication Test', () => {

  it('#AT_04_Tests successful login & logout', () => {
    const email = 'xaref65412@fsouda.com';
    const password = 'Parole321';

    cy.visit(longenesis_url) 
    cy.get('#login_from_menu').click()
    cy.get('input#username').type(email).should('have.value', email)
    cy.get('input[name="login"]').click()
    cy.get('input#password').type(password).should('have.value', password)
    cy.get('input[name="login"]').click()
    cy.get('#logout_from_menu').click()
    cy.get('#login_from_menu')
  })

  it('#AT_05_Tests login with invalid email', () => {
    const email = 'a@fajkbfajkbfdjkdfjkssfjk.com';

    cy.visit(longenesis_url)
    cy.get('#login_from_menu').click()
    cy.get('input#username').type(email).should('have.value', email)
    cy.get('input[name="login"]').click()
    cy.get('#input-error-username')
  })

  it('#AT_06_Tests remember me functionality', () => {
    const email = 'xaref65412@fsouda.com';
    const password = 'Parole321';
    
    cy.visit(longenesis_url)
    cy.get('#login_from_menu').click()
    cy.get('input#username').type(email).should('have.value', email)
    cy.get('#rememberMe').check()
    cy.get('input[name="login"]').click()
    cy.get('input#password').type(password).should('have.value', password)
    cy.get('input[name="login"]').click()
    cy.get('#logout_from_menu').click()
    cy.get('#login_from_menu').click()
    cy.get('input#username').should('have.value', email)
    cy.get('#rememberMe').should('be.checked')
  }) 
})






