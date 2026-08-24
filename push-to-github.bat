@echo off
echo ========================================================
echo Pushing ESPACIO Coming Soon to GitHub
echo Repo: https://github.com/espaciosoftware111-svg/espacio-website-comming-soon.git
echo ========================================================
echo.

git init
git add .
git commit -m "feat: complete ESPACIO luxury website with Image 2 logo animation, clean CMS, and linked channels"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/espaciosoftware111-svg/espacio-website-comming-soon.git

echo.
echo Attempting to push...
git push -u origin main --force

echo.
echo ========================================================
echo If you saw a 403 Permission Denied error above:
echo 1. Open: https://github.com/espaciosoftware111-svg/espacio-website-comming-soon/settings/access
echo 2. Click 'Add people' and invite 'akshaykumarpullagura-2006'
echo 3. Run this script again!
echo ========================================================
pause
