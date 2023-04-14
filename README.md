# Bikeshop Monorepo

Frontend project for an online shop with basic shopping cart. It's built following Robert C. Martins Clean Architecture principles.

Its aims to have the application logic in a separate package, which is independent of the Views technicalities so that it can be easily maintained.

# Details

This is a monorepo using npm-workspaces. The root level npm tasks orchestrate operations on all packages using idiomatic npm task names.

# How to start for development

1. Install dependencies
`npm install`

2. Start the frontend application in dev mode, and build the base package beforehand
`npm run start`

# Run tests

Run tests in all packages
`npm run test`
