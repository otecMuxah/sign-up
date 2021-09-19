# SignUp

## Installation

Run 'npm i' for dependency installation

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## What was done ?

Implemented tasks
- Build a single page app with a sign-up form.
- The form should allow users to enter first name, last name, email, and password.
- All fields are required.
- Password validation:
  - Should be a minimum of eight characters,
  - Should contain lower and uppercase letters,
  - Should not contain user’s first or last name.
- Email should be validated
- The form should send a POST request to https://demo-api.now.sh/users. The request body example:
  `{
  firstName: "Thomas",
  lastName: "Shelby",
  email: "thomas@shelby.co.uk"
  }`

## Tools used
- Angular
- Angular Material
- Eslint
- Prettier
- Karma
- Domain Driven Design architecture
- SCAM (single component angular module)
