# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
#WORKDIR /build

RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

# Copy source from machine onto the container
WORKDIR /src
COPY . .

RUN npm install axios
RUN npm install

RUN dotnet restore "./SpotOps.Web/SpotOps.csproj"
RUN dotnet publish "./SpotOps.Web/SpotOps.csproj" -c release -o /app/publish

# final stage/image
FROM mcr.microsoft.com/dotnet/sdk:5.0

# Expose port 80 to your local machine so you can access the app.
EXPOSE 80

COPY --from=build /app/publish ./
ENTRYPOINT ["dotnet", "spotops.dll"]
