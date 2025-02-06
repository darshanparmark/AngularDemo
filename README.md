# Angular Demo - GitHub Pages Deployment Guide

This repository demonstrates how to set up an Angular application and deploy it to GitHub Pages using GitHub Actions for continuous deployment.

## Quick Start Guide

### 1. Setting Up a New Angular Project

```bash
# Install Angular CLI globally (if not already installed)
npm install -g @angular/cli

# Create new Angular project
ng new your-app-name
cd your-app-name

# Start development server
ng serve
```

### 2. GitHub Repository Setup

1. Create a new repository on GitHub
2. Initialize local Git repository:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repository.git
git push -u origin main
```

### 3. GitHub Actions Workflow Setup

1. Create workflow directory:
```bash
mkdir -p .github/workflows
```

2. Create workflow file `.github/workflows/angular-ci.yml`:
```yaml
name: GitHub Pages Deployment
on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build -- --configuration production --base-href "/your-repo-name/"

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist/your-app-name/browser
```

### 4. Required Configuration

1. Update `angular.json`:
```json
{
  "projects": {
    "your-app-name": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/your-app-name/browser",
            "baseHref": "/your-repo-name/"
          }
        }
      }
    }
  }
}
```

2. Add base href in `index.html`:
```html
<base href="/your-repo-name/">
```

3. Create `404.html` for proper routing:
```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
</html>
```

### 5. GitHub Pages Setup

1. Go to repository Settings > Pages
2. Set Source to "GitHub Actions"
3. Ensure workflow has necessary permissions:
   - Settings > Actions > General > Workflow permissions
   - Select "Read and write permissions"

## Development Guide

### Local Development

```bash
# Start development server
ng serve

# Build for production
ng build --configuration production

# Run tests
ng test
```

### Making Changes

1. Create a new branch for your changes:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:
```bash
git add .
git commit -m "Description of changes"
```

3. Push changes and create a pull request:
```bash
git push origin feature/your-feature-name
```

## Troubleshooting

### Common Issues

1. **404 Errors After Deployment**
   - Ensure base href is correctly set
   - Verify 404.html is properly configured
   - Check GitHub Pages settings

2. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review GitHub Actions logs

3. **Routing Issues**
   - Ensure proper base href configuration
   - Check if HashLocationStrategy is needed
   - Verify routes are properly configured

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
