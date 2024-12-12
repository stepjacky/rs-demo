@echo off
cls
if "%MEX_HOME%" NEQ "" goto end
set MEX_HOME=d:\node-v20.18.0
set path=%path%;%MEX_HOME%
:end