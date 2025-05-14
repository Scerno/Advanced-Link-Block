@echo off
echo ==============================================================
echo  Advanced Link Block – Build & Copy schema
echo ==============================================================

REM 1) Always start in the folder this batch file lives in
%~d0
cd /d "%~dp0"
echo Current dir: %CD%
echo.


REM 2) Run the build
echo Running "npm run build" ...
call npm run build
IF ERRORLEVEL 1 (
    echo.
    echo -- Build failed: JSON not copied.
    pause
    goto :eof
)

pause
