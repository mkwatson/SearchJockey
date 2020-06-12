This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deployment

This project uses [CircleCi](https://app.circleci.com/pipelines/github/mkwatson/SearchJockey) and [CodeClimate](https://codeclimate.com/github/mkwatson/SearchJockey) for CI/CD.

The project is hosted (currently only development/staging) at [https://searchjockey.web.app](https://searchjockey.web.app)

## Available Scripts

In the project directory, you can run:

### Before Development

Make sure you have npm installed, then run

#### `npm install`

Installs project dependencies

### During Development

We recommend development with [VSCode](https://code.visualstudio.com/download)

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Before Committing

These all run as part of the CD pipeline anyway, so it's only going to save you time to find (and fix) them locally first!

#### `npm run lint`

Analyze source code to flag programming errors, bugs, stylistic errors, and suspicious constructs.

You can fix many errors automatically using `npm run lint:fix`

#### `npm test -- --coverage --watchAll=false`

Test coverage

#### `codeclimate validate-config`

Check `.codeclimate.yml` (if you've made changes).
