@echo off
echo ==============================================
echo Pushing ESPACIO Coming Soon to GitHub
echo Repository: https://github.com/espaciosoftware111-svg/espacio-website-comming-soon.git
echo ==============================================
echo.

git init
git add .
git commit -m "feat: complete ESPACIO luxury coming soon website and exact logo animation"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/espaciosoftware111-svg/espacio-website-comming-soon.git
git push -u origin main --force

echo.
echo ==============================================
echo Push Complete!
echo ==============================================
pause
