# Project variables
PROJECT_NAME ?= SpotOps

.PHONY: migrations db remove hello

add_migrations:
	dotnet ef migrations add $(mname) --output-dir ./Data/Migrations/

remove_migrations:
	dotnet ef migrations remove

update_db:
	dotnet ef database update

drop_db:
    dotnet ef database drop -f -v

hello:
	echo 'Hello!'
