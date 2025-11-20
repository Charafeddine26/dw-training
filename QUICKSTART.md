# Quick Start Guide

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm (comes with Node.js)
- Git

## Installation

1. **Clone or navigate to the project:**
   ```bash
   cd dw-training
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Development

### Start the Development Server

```bash
npm start
```

The application will be available at `http://localhost:4200/`

### Project Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run build:prod` | Build with production configuration |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint the code |
| `npm run lint:fix` | Lint and fix issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run graph` | View project dependency graph |

## Project Structure

```
src/
├── app/
│   ├── core/              # Services, guards, interceptors
│   ├── feature/           # Feature modules and components
│   ├── shared/            # Shared components, pipes, directives
│   ├── app.ts             # Root component
│   ├── app.config.ts      # App configuration
│   └── app.routes.ts      # Route definitions
├── environments/          # Environment configurations
├── assets/                # Static assets
├── styles.scss            # Global styles
└── index.html             # Main HTML file
```

## Creating Your First Component

### Generate a Feature Component

```bash
npx nx g @nx/angular:component feature/welcome --standalone
```

### Generate a Shared Component

```bash
npx nx g @nx/angular:component shared/button --standalone
```

### Generate a Service

```bash
npx nx g @nx/angular:service core/data
```

## Key Features

### ✅ Zoneless Mode
This project uses Angular's new zoneless change detection for better performance:
```typescript
provideZonelessChangeDetection()
```

### ✅ Standalone Components
All components are standalone - no NgModules needed:
```typescript
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  // ...
})
```

### ✅ Angular Material
Pre-configured with Material Design:
```typescript
import { MatButtonModule } from '@angular/material/button';
```

### ✅ Jest Testing
Modern testing with Jest (not Karma):
```bash
npm test
```

### ✅ HTTP Client with Fetch API
```typescript
import { HttpClient } from '@angular/common/http';
// Already configured with withFetch()
```

## Testing

### Write a Test

```typescript
import { render, screen } from '@testing-library/angular';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  it('should render', async () => {
    await render(MyComponent);
    expect(screen.getByText('Hello')).toBeTruthy();
  });
});
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## Using Angular Material

### Import Material Components

```typescript
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-content>
        <button mat-raised-button color="primary">Click Me</button>
      </mat-card-content>
    </mat-card>
  `
})
export class MyComponent {}
```

## Environment Configuration

### Using Environment Variables

```typescript
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}
  
  getData() {
    return this.http.get(`${this.apiUrl}/data`);
  }
}
```

## Troubleshooting

### Port Already in Use

If port 4200 is already in use, you can specify a different port:

```bash
npx nx serve dw-training --port 4300
```

### Clear Nx Cache

If you encounter build issues, clear the Nx cache:

```bash
npx nx reset
```

### Dependency Issues

If you have dependency conflicts, try:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Read the [README.md](./README.md) for detailed documentation
2. Explore the [Angular Documentation](https://angular.dev)
3. Learn about [Nx](https://nx.dev)
4. Check out [Angular Material Components](https://material.angular.io)

## Getting Help

- **Angular**: https://angular.dev/docs
- **Nx**: https://nx.dev/getting-started/intro
- **Angular Material**: https://material.angular.io/components
- **Jest**: https://jestjs.io/docs/getting-started

Happy coding! 🚀

