using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AuthorPropertyAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhotoUrl",
                table: "Videos",
                newName: "Author");

            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "Stories",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Author",
                table: "Stories");

            migrationBuilder.RenameColumn(
                name: "Author",
                table: "Videos",
                newName: "PhotoUrl");
        }
    }
}
