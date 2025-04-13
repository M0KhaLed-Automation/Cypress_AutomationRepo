
const { random } = require("lodash");
let email="";
let name="";
describe('template spec', () => {
 beforeEach(() => {
    cy.visit('/')
  });

  it('SignUpTestCase', function () {
    cy.fixture('signupInfo.json').then((fixtures) => {
       email=fixtures.email + random(1, 1000).toString() + '@gmail.com';
       name=fixtures.name + random(1, 1000).toString();
      // Validate we are on the home page
      cy.contains(' Home').should('have.css', 'color', 'rgb(255, 165, 0)')
      // Click on the "Signup / Login" button
      cy.contains(' Signup / Login').click()
      // Validate we are on the login page
      cy.contains(' Signup / Login').should('have.css', 'color', 'rgb(255, 165, 0)')
      cy.url().should('include', '/login')
      // Validate the "New User Signup!" text is visible
      cy.contains('New User Signup!').should('be.visible')
      // Fill in the signup form
      cy.get('input[name="name"]').type(name)  
      cy.get('input[data-qa="signup-email"]').type(email)
      cy.get('button[data-qa="signup-button"]').click()
      cy.contains('Enter Account Information').should('be.visible')
      
      cy.get('input[id="id_gender1"]').check('Mr')

    
      cy.get('input[data-qa="name"]').invoke('val').then((value) => {
        expect(value).to.contains(fixtures.name )
        
      })
      cy.get('input[data-qa="email"]').should('be.disabled')
      
      cy.get('input[data-qa="email"]').invoke('val').then((value) => {
        
        expect(value).to.contains(fixtures.email)
        email=value
        cy.get('input[data-qa="password"]').type(fixtures.password)
        cy.get('select[data-qa="days"]').select(fixtures.birth_date.day) 
         cy.get('select[data-qa="months"]').select(fixtures.birth_date.month)
        cy.get('select[data-qa="years"]').select(fixtures.birth_date.year)
        cy.get('input[id="newsletter"]').click()
        cy.get('input[data-qa="first_name"]').type(fixtures.firstName)
        cy.get('input[data-qa="last_name"]').type(fixtures.lastName)
        cy.get('input[data-qa="company"]').type(fixtures.company)
        cy.get('input[data-qa="address"]').type(fixtures.address)
        cy.get('select[data-qa="country"]').select(fixtures.country)
        cy.get('input[data-qa="state"]').type(fixtures.state)
        cy.get('input[data-qa="city"]').type(fixtures.city)
        cy.get('input[data-qa="zipcode"]').type(fixtures.zip)
        cy.get('input[data-qa="mobile_number"]').type(fixtures.phone)
        cy.get('button[data-qa="create-account"]').click()
        cy.contains('Account Created!').should('be.visible')
        cy.get('a[data-qa="continue-button"]').click()
        cy.contains('Logged in as').should('be.visible')
        cy.contains(fixtures.name).should('be.visible')
        cy.contains(' Logout').click()
        
        
      })

    })
    
  })
  it('LoginTestCase', function () {
    cy.fixture('signupInfo.json').then((fixtures) => {
      // Validate we are on the home page
      cy.contains(' Home').should('have.css', 'color', 'rgb(255, 165, 0)')
      // Click on the "Signup / Login" button
      cy.contains(' Signup / Login').click()
      // Validate we are on the login page
      cy.contains(' Signup / Login').should('have.css', 'color', 'rgb(255, 165, 0)')
      cy.url().should('include', '/login')
      // Validate the "New User Signup!" text is visible
      cy.contains('Login to your account').should('be.visible')
      cy.get('input[data-qa="login-email"]').type(email)
      cy.get('input[data-qa="login-password"]').type(fixtures.password)
      cy.get('button[data-qa="login-button"]').click()
      cy.contains('Logged in as').should('be.visible')
      cy.contains(name).should('be.visible')
      cy.contains(' Delete Account').click()
      cy.contains('Account Deleted!').should('be.visible')
      cy.get('a[data-qa="continue-button"]').click()
      cy.contains(' Home').should('have.css', 'color', 'rgb(255, 165, 0)')

    })
  }

  )   }
)