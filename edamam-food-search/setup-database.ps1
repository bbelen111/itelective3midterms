# Quick Database Setup Script for Windows

Write-Host "=== Food Search Database Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if MySQL is accessible
Write-Host "Checking MySQL installation..." -ForegroundColor Yellow
$mysqlPath = "mysql"

try {
    $null = & $mysqlPath --version 2>&1
    Write-Host "✓ MySQL found" -ForegroundColor Green
} catch {
    Write-Host "✗ MySQL not found in PATH" -ForegroundColor Red
    Write-Host "Please ensure MySQL is installed and added to your PATH" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To run manually:" -ForegroundColor Cyan
    Write-Host "  mysql -u root -p < backend/db/setup.sql" -ForegroundColor White
    exit 1
}

Write-Host ""
Write-Host "This script will:" -ForegroundColor Yellow
Write-Host "  1. Create the 'food_search_db' database" -ForegroundColor White
Write-Host "  2. Create the 'food_items' table" -ForegroundColor White
Write-Host "  3. Insert 3 sample food items" -ForegroundColor White
Write-Host ""

# Prompt for MySQL password
$password = Read-Host "Enter your MySQL root password (leave empty if no password)" -AsSecureString
$plainPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
)

Write-Host ""
Write-Host "Setting up database..." -ForegroundColor Yellow

# Run the SQL script
if ($plainPassword -eq "") {
    & $mysqlPath -u root < "backend\db\setup.sql"
} else {
    & $mysqlPath -u root -p$plainPassword < "backend\db\setup.sql"
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✓ Database setup completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Edit backend/.env file with your MySQL password" -ForegroundColor White
    Write-Host "  2. Run: cd backend && npm run dev" -ForegroundColor White
    Write-Host "  3. Run: cd frontend && npm run dev (in another terminal)" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "✗ Database setup failed" -ForegroundColor Red
    Write-Host "Please check your MySQL credentials and try again" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To run manually:" -ForegroundColor Cyan
    Write-Host "  mysql -u root -p < backend/db/setup.sql" -ForegroundColor White
    Write-Host ""
}
