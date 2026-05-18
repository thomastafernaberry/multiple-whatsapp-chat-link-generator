@echo off
start server.exe -p 8080
timeout /t 2
start http://localhost:8080
