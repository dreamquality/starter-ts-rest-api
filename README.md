
# Petstore API Testing Framework

This is a testing framework built to interact with and test the Petstore API. It utilizes Axios for making HTTP requests, integrates with Allure for generating detailed test reports, and uses TypeScript for type safety.

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Available API Methods](#available-api-methods)
  - [Executing Tests](#executing-tests)
- [Allure Reports](#allure-reports)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd petstore-api-testing-framework
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed (recommended version: >=16.0.0). Then run:
   ```bash
   npm install
   ```

## Project Structure

The framework is structured as follows:

```
petstore-api-testing-framework/
│
├── src/
│   ├── tests/
│   │   └── petstoreApi.test.ts        # Main test file for Petstore API
│   │
│   ├── utils/
│   │   ├── baseApiClient.ts           # Base API client with REST methods
│   │   ├── dataBuilder.ts             # Data Builder for test data generation
│   │   └── userLoader.ts              # Utility for loading user data from JSON
│   │
│   └── config/
│       └── config.ts                  # Configuration for API connection
│
├── data/
│   └── users.json                     # JSON file with user data
│
├── .env                               # Environment variables
├── .gitignore                         # Ignored files
├── jest.config.js                     # Jest configuration
├── package.json                       # Dependencies and scripts
├── tsconfig.json                      # TypeScript configuration
└── README.md                          # Project documentation
```

## Configuration

1. **Environment Variables:**
   - Create a `.env` file in the root directory.
   - Define environment variables for the framework. Example:
     ```
     BASE_URL=https://petstore.swagger.io/v2
     ```

2. **Jest Configuration:**
   - The testing framework uses Jest as the test runner, with Allure as the reporting tool.
   - The configuration file is `jest.config.js`.

## Usage

### Available API Methods

The framework provides the following REST methods in the `BaseApiClient` class:

- **GET**: `get<T>(url: string, params?: any): Promise<T>`
- **POST**: `post<T>(url: string, data?: any): Promise<T>`
- **PATCH**: `patch<T>(url: string, data?: any): Promise<T>`
- **DELETE**: `delete<T>(url: string): Promise<void>`
- **UPLOAD**: `upload<T>(url: string, filePath: string, fieldName: string = 'file'): Promise<T>`

### Executing Tests

1. **Run Tests:**
   - Use the following command to execute the test suite:
     ```bash
     npm run test
     ```

2. **Test Options:**
   - To generate an Allure report:
     ```bash
     npm allure
     ```
   - This command runs the tests in Jest and generates a detailed Allure report, which is then opened in a browser.

## Allure Reports

Allure is used as the primary reporting tool to visualize test results. It generates detailed reports that include:
- Request and response bodies
- Request and response headers
- Error messages, if any
- Timestamps and durations

### Generating Allure Reports

1. **Run tests with Allure:**
   ```bash
   npm run allure
   ```
2. **View Allure Report:**
   - After test execution, the report will be automatically generated and opened in a browser window.
   - Allure results will be saved in the `allure-results` directory.

## Contributing

Feel free to contribute to the project by submitting pull requests, reporting issues, or suggesting improvements. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
