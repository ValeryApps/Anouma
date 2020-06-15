using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class ImageUrlAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageName",
                table: "Images",
                newName: "PubliId");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Stories",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "Images",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Stories");

            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "Images");

            migrationBuilder.RenameColumn(
                name: "PubliId",
                table: "Images",
                newName: "ImageName");
        }
    }
}
