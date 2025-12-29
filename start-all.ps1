# dotnet watch run

# Start-Process powershell -ArgumentList "cd car-showcase; npm run dev"
# Start-Process powershell -ArgumentList "cd car-data-api; mvn spring-boot:run"
# Start-Process powershell -ArgumentList "cd car-image-api; dotnet run"

Start-Process cmd.exe -ArgumentList "/k cd car-showcase && npm run dev"
Start-Process cmd.exe -ArgumentList "/k cd car-data-api && mvn spring-boot:run"
Start-Process cmd.exe -ArgumentList "/k cd car-image-api && dotnet run"