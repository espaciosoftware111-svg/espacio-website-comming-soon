@echo off
echo ========================================================
echo Pushing ESPACIO Coming Soon to GitHub
echo Repo: https://github.com/espaciosoftware111-svg/espacio-website-comming-soon.git
echo ========================================================
echo.

git init
git add .
git commit -m "feat: push latest luxury coming soon website updates"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/espaciosoftware111-svg/espacio-website-comming-soon.git

echo.
echo Attempting to push...
git push -u origin main --force

echo.
echo ========================================================
echo Pushed successfully to https://github.com/espaciosoftware111-svg/espacio-website-comming-soon.git!
echo ========================================================
pause
