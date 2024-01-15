@ECHO OFF

if "%1"=="" goto run_dev

@REM Running application with prepared arguments as %*
nmp run %*
goto end

:run_dev
@REM By default it's running in development mode

npx next dev

:end
REM It could've been done already and following line are for precautious.
if %ERRORLEVEL%!==0 echo Error Level: "%ERRORLEVEL%"
pause;
exit %ERRORLEVEL%