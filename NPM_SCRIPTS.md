# NPM Scripts Guide

Quick reference for all available npm scripts in this project.

## Development

### `npm run dev`
Starts the Next.js development server.

```bash
npm run dev
```

- Runs on http://localhost:3000
- Hot reload enabled
- Shows detailed error messages
- TypeScript type checking
- Use this for local development

### `npm run build`
Creates an optimized production build.

```bash
npm run build
```

- Compiles TypeScript
- Optimizes bundles
- Generates static pages
- Required before `npm start`
- Use this to test production build locally

### `npm start`
Starts the production server (requires build first).

```bash
npm run build
npm start
```

- Runs optimized production code
- Use this to test performance
- Should match Vercel deployment

### `npm run lint`
Runs ESLint to check code quality.

```bash
npm run lint
```

- Checks TypeScript/JavaScript files
- Reports code style issues
- Enforces best practices
- Run before committing

## Useful Commands

### Install Dependencies
```bash
npm install
```

### Update Dependencies
```bash
npm update
```

### Add New Dependency
```bash
npm install package-name
```

### Add Dev Dependency
```bash
npm install -D package-name
```

### Remove Dependency
```bash
npm uninstall package-name
```

## Cleaning Up

### Clear Next.js Cache
```bash
# Windows
rmdir /s /q .next
npm run dev

# Linux/Mac
rm -rf .next
npm run dev
```

### Clear Node Modules
```bash
# Windows
rmdir /s /q node_modules
npm install

# Linux/Mac
rm -rf node_modules
npm install
```

### Full Clean Install
```bash
# Windows
rmdir /s /q node_modules
rmdir /s /q .next
del package-lock.json
npm install

# Linux/Mac
rm -rf node_modules .next package-lock.json
npm install
```

## Development Workflow

### Daily Development
```bash
# 1. Start development server
npm run dev

# 2. Make changes
# Edit files in your code editor

# 3. Changes auto-reload
# Check http://localhost:3000

# 4. Check for issues
npm run lint
```

### Before Committing
```bash
# 1. Run linter
npm run lint

# 2. Test production build
npm run build
npm start

# 3. Commit if all works
git add .
git commit -m "Your message"
git push
```

### Deploying to Vercel
```bash
# Just push to GitHub
git push

# Vercel auto-deploys from main branch
# Monitor at vercel.com/dashboard
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### TypeScript Errors
```bash
# Delete TypeScript cache
rm -rf .next/cache
npm run dev
```

### Module Not Found
```bash
# Reinstall dependencies
npm install
```

### Build Fails
```bash
# Clear everything and rebuild
rm -rf .next node_modules
npm install
npm run build
```

## Environment Variables

### Local Development
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Check Environment
```bash
# In code
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### Vercel
Add in Vercel dashboard:
- Settings → Environment Variables
- Add each variable
- Redeploy for changes to take effect

## Database Commands

These aren't npm scripts, but useful Supabase commands:

### Reset Database
In Supabase SQL Editor:
```sql
-- CAUTION: This deletes all data
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
-- Then run migrations again
```

### Backup Database
In Supabase dashboard:
- Settings → Database → Backups
- Or use pg_dump (advanced)

## Tips

### Speed Up Development
- Use `npm run dev` - it's faster than `npm start`
- Keep terminal open to see errors
- Use VS Code for TypeScript integration

### Before Pushing to GitHub
```bash
npm run lint
npm run build
```

### Testing Production Locally
```bash
npm run build
npm start
# Visit http://localhost:3000
```

### Multiple Terminals
Open 3 terminals:
1. `npm run dev` - Development server
2. Free for git commands
3. Free for file operations

## Common Tasks

### Adding a New Page
1. Create `app/new-page/page.tsx`
2. No restart needed (hot reload)
3. Visit `http://localhost:3000/new-page`

### Updating Packages
```bash
# Check for updates
npm outdated

# Update all
npm update

# Update specific
npm install package-name@latest
```

### Fix Permission Issues
```bash
# Windows (run as administrator)
npm cache clean --force
npm install

# Linux/Mac
sudo npm install
```

## Performance

### Build Size
```bash
npm run build
# Check .next/analyze for bundle size
```

### Development Performance
- Close unused tabs
- Restart dev server occasionally
- Clear .next cache if slow

## Production

### Vercel Deployment
Automatic on git push to main:
```bash
git push origin main
# Check vercel.com/dashboard
```

### Manual Vercel Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Check code quality |
| `npm install` | Install dependencies |
| `npm update` | Update packages |

---

**Pro Tips:**

1. Always run `npm run dev` for development
2. Test with `npm run build && npm start` before deploying
3. Run `npm run lint` to catch issues early
4. Keep dependencies updated monthly
5. Use `.env.local` for local secrets

**Need Help?**

Check the main README.md or DEVELOPMENT.md for more information.
