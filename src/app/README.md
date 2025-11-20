# Application Structure

This Angular application follows a modular structure with standalone components.

## Folder Structure

### `/core`
Contains singleton services, guards, interceptors, and other core application logic that should be loaded once.

**Examples:**
- Authentication services
- HTTP interceptors
- Global guards
- Application-wide services

### `/feature`
Contains feature-specific components and logic. Each feature should be self-contained and represent a specific functionality of the application.

**Examples:**
- User management feature
- Dashboard feature
- Product catalog feature

### `/shared`
Contains reusable components, pipes, directives, and utilities that can be used across multiple features.

**Examples:**
- UI components (buttons, cards, dialogs)
- Custom pipes (date formatting, currency)
- Directives (highlight, tooltip)
- Utility functions

## Creating New Components

### Generate a Component

```bash
# In the feature folder
npx nx g @nx/angular:component feature/my-feature --standalone

# In the shared folder
npx nx g @nx/angular:component shared/my-component --standalone
```

### Generate a Service

```bash
# In the core folder
npx nx g @nx/angular:service core/my-service
```

### Generate a Pipe

```bash
# In the shared folder
npx nx g @nx/angular:pipe shared/my-pipe --standalone
```

## Best Practices

1. **Use Standalone Components**: All components should be standalone (no NgModules)
2. **Keep Components Small**: Each component should have a single responsibility
3. **Use Services for Business Logic**: Components should only handle presentation logic
4. **Use TypeScript Strictly**: Enable all strict TypeScript options
5. **Write Tests**: Every component/service should have corresponding tests
6. **Use RxJS Wisely**: Avoid nested subscriptions, use operators instead
7. **Follow Angular Style Guide**: Follow the official Angular coding style guide

## Testing

All components and services should have unit tests. Tests are configured to run with Jest in zoneless mode.

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Styling

- Global styles: `src/styles.scss`
- Component styles: Use component-level SCSS files
- Material theming: Configured in `project.json`

## Environment Configuration

Environment-specific configuration is located in `src/environments/`:
- `environment.ts` - Development configuration
- `environment.prod.ts` - Production configuration

Import and use environment variables like this:

```typescript
import { environment } from '../environments/environment';

console.log(environment.production); // false in development
console.log(environment.apiUrl); // http://localhost:3000/api in development
```

