using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ProductRemoveOrders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Products_ProductEntityId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ProductEntityId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ProductEntityId",
                table: "Orders");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductEntityId",
                table: "Orders",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ProductEntityId",
                table: "Orders",
                column: "ProductEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Products_ProductEntityId",
                table: "Orders",
                column: "ProductEntityId",
                principalTable: "Products",
                principalColumn: "Id");
        }
    }
}
