# Project variables
PROJECT_NAME ?= SpotOps

.PHONY: migrations db remove hello

migrations:
	dotnet ef migrations add $(mname)

db:
	dotnet ef database update

remove:
	dotnet ef migrations remove

hello:
	echo 'Hello!'
