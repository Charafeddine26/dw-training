# DW Training - Nx Angular Monorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

This is an Nx Monorepo with Angular applications for training exercises.

## 🔧 Core Technology Stack

### Framework & Platform

- **Angular**: v20.0.6 (latest)
- **Angular Material**: v20.0.5
- **RxJS**: v7.8.0
- **Zone.js**: v0.15.0 (but project uses zoneless mode)
- **TypeScript**: v5.8.3
- **Node.js**: 18+ (LTS recommended)
- **Package Manager**: npm

### Build & Development Tools

- **Nx**: v21.2.2 (monorepo management)
- **Angular CLI**: v20.0.0
- **Sass/SCSS**: v1.19.0+ for styling

### Testing

- **Jest**: v29.7.0 (NOT Vitest - this project uses Jest!)
- **Jest Preset Angular**: v14.6.0
- **@testing-library/angular**: v17.0.0
- **Test Setup**: Zoneless test environment

### Linting & Formatting

- **ESLint**: v9.8.0
- **angular-eslint**: v20.0.0
- **Prettier**: v3.6.0

## 📁 Project Structure

```
dw-training/
├── src/
│   ├── app/
│   │   ├── core/              # Services, providers, guards
│   │   ├── feature/           # Feature components
│   │   ├── shared/            # Shared components, pipes, directives
│   │   ├── app.ts             # Root component
│   │   ├── app.config.ts      # Application configuration
│   │   └── app.routes.ts      # Route definitions
│   ├── assets/                # Images, static files
│   ├── environments/
│   │   ├── environment.ts     # Development environment
│   │   └── environment.prod.ts # Production environment
│   ├── index.html             # Main HTML file
│   ├── main.ts               # Bootstrap file
│   ├── styles.scss           # Global styles
│   └── test-setup.ts         # Jest configuration
├── project.json              # Nx project config
├── jest.config.ts            # Jest configuration
├── tsconfig.json             # Base TS config
├── tsconfig.app.json         # App TS config
├── tsconfig.spec.json        # Test TS config
├── eslint.config.mjs         # ESLint config
├── .prettierrc               # Prettier config
└── package.json              # Dependencies & scripts
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
# or
npx nx serve dw-training
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

```bash
npm run build
# or
npx nx build dw-training
```

Build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
npm test
# or
npx nx test dw-training
```

This project uses **Jest** with zoneless test environment setup.

### Linting

```bash
npx nx lint dw-training
```

### Format Code with Prettier

```bash
npx prettier --write .
```

## 🎯 Key Configuration Details

### 1. Angular Configuration (Standalone Components)

- Uses standalone components (no NgModules)
- Zoneless change detection (`provideZonelessChangeDetection()`)
- Component input binding enabled for routes
- Material Design prebuilt theme (indigo-pink)

### 2. TypeScript Configuration

```json
{
  "target": "es2022",
  "module": "preserve",
  "moduleResolution": "bundler",
  "experimentalDecorators": true,
  "strictInjectionParameters": true,
  "strictTemplates": true
}
```

### 3. Jest Configuration (NOT Vitest!)

- Uses `jest-preset-angular`
- Zoneless test setup (`setupZonelessTestEnv()`)
- Coverage directory: `coverage/dw-training`
- Transform for `.ts|.mjs|.js|.html` files

### 4. ESLint Configuration

- Component prefix: `app` (customize as needed)
- Directive selector: camelCase
- Component selector: kebab-case
- Prettier integration enabled

### 5. Nx Workspace Settings

- Package Manager: npm
- Default test runner: Jest
- Style: SCSS
- Linter: ESLint
- Cacheable operations: build, lint, test, e2e

## 📦 Key Features

- **Zoneless Mode**: Uses `provideZonelessChangeDetection()` instead of Zone.js for better performance
- **Standalone Components**: No NgModules, everything is standalone
- **Angular Material**: Pre-configured with Material Design components
- **Testing Library**: Modern testing utilities with Angular Testing Library
- **SSR Ready**: Server-side rendering enabled with Angular SSR
- **HTTP Client**: Configured with `provideHttpClient(withFetch())`
- **Router**: Configured with `withComponentInputBinding()` for component input binding

## 🎨 Angular Material

Angular Material is pre-configured with the `indigo-pink` theme. You can change the theme by modifying the theme import in `project.json`.

Available prebuilt themes:
- deeppurple-amber.css
- indigo-pink.css
- pink-bluegrey.css
- purple-green.css

## 📚 Useful Commands

### Generate a Component

```bash
npx nx g @nx/angular:component my-component --project=dw-training
```

### Generate a Service

```bash
npx nx g @nx/angular:service my-service --project=dw-training
```

### Generate a Pipe

```bash
npx nx g @nx/angular:pipe my-pipe --project=dw-training
```

### View Project Graph

```bash
npx nx graph
```

## ⚠️ Important Notes

- This project uses **JEST, NOT Vitest** - All test configuration is Jest-based
- **Zoneless mode** - Uses `provideZonelessChangeDetection()` instead of Zone.js
- **Standalone components** - No NgModules, everything is standalone
- **Angular 20** - Latest version with all modern features
- **Nx monorepo** - Great for managing multiple apps/libraries

## 🔗 Useful Links

Learn more:

- [Angular Documentation](https://angular.dev)
- [Nx Documentation](https://nx.dev)
- [Angular Material](https://material.angular.io)
- [Jest Documentation](https://jestjs.io)

## 📄 License

MIT
