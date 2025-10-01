# Paula's Place - Quick Start Script
# This script sets up and runs the e-commerce website

Write-Host "🛍️  Paula's Place - E-Commerce Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
    Write-Host ""
}

# Check if database exists
if (-Not (Test-Path "prisma/dev.db")) {
    Write-Host "🗄️  Setting up database..." -ForegroundColor Yellow
    npx prisma generate
    npx prisma db push
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to set up database" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Database created" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "🌱 Seeding sample products..." -ForegroundColor Yellow
    npx tsx prisma/seed.ts
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to seed database" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Sample products added" -ForegroundColor Green
    Write-Host ""
}

Write-Host "🚀 Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📍 Your site will be available at:" -ForegroundColor Cyan
Write-Host "   http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Admin dashboard:" -ForegroundColor Cyan
Write-Host "   http://localhost:3000/admin" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

npm run dev
