using Microsoft.EntityFrameworkCore.Migrations;

namespace SpotOps.Data.Migrations
{
    public partial class AddSpotType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Spots",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Spots");
        }
    }
}
