@echo off
REM Setup script for Past Papers Archive (Windows)

echo Setting up Past Papers Archive...

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo Node.js is installed
node -v

REM Check if npm is installed
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo npm is not installed.
    exit /b 1
)

echo npm is installed
npm -v

REM Install dependencies
echo Installing dependencies...
call npm install

REM Check if .env.local exists
if not exist .env.local (
    echo .env.local not found. Creating from example...
    copy .env.example .env.local
    echo Please edit .env.local and add your credentials
)

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Edit .env.local with your Supabase and bKash credentials
echo 2. Set up Supabase database (see DEPLOYMENT.md)
echo 3. Run 'npm run dev' to start development server
echo.
echo For detailed instructions, see DEPLOYMENT.md
