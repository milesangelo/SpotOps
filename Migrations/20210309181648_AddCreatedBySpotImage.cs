using Microsoft.EntityFrameworkCore.Migrations;

namespace SpotOps.Migrations
{
    public partial class AddCreatedBySpotImage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "SpotImages",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "SpotImages");
        }
    }
}
