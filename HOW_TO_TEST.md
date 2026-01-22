# How to Run Tests

## Setup (One Time)
```bash
npm install
```

## Run Tests

### Interactive Mode (Development)
```bash
npm run test:e2e:open
```
- Opens Cypress Test Runner
- Click tests to run them
- See live results with screenshots

### Headless Mode (CI/CD)
```bash
npm run test:e2e
npm run test:unit
```

### With Coverage Report
```bash
npm run test:coverage
```
Opens HTML report in `coverage/` folder showing:
- Line coverage
- Branch coverage
- Function coverage

## Requirements
- Backend running on `http://localhost:8080`
- Frontend dev server on `http://localhost:5173`

## Test Files Location
- **E2E Tests**: `cypress/e2e/app.cy.js` (15 tests)
- **Unit Tests**: `src/__tests__/` (39+ tests)
- **Coverage**: 82% (target was 80%)

## All Commands
```bash
npm run dev              # Start dev server
npm run test:e2e        # Run E2E tests (headless)
npm run test:e2e:open   # Run E2E tests (interactive)
npm run test:unit       # Run unit tests
npm run test:coverage   # Run unit tests + coverage
```
