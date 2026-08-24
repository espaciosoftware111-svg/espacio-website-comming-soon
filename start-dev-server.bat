@echo off
title ESPACIO Dev Server
echo ========================================================
echo Starting ESPACIO Local Development Server...
echo ========================================================
echo.
cd /d "%~dp0"
call npm run dev
pause
