using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CartItems_ProductsToPieces : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_Products_ProductId",
                table: "CartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_ParfumeBottleds_Products_ProductId",
                table: "ParfumeBottleds");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ParfumeBottleds",
                table: "ParfumeBottleds");

            migrationBuilder.RenameTable(
                name: "ParfumeBottleds",
                newName: "ParfumeBottles");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "CartItems",
                newName: "ProductPieceId");

            migrationBuilder.RenameIndex(
                name: "IX_CartItems_ProductId",
                table: "CartItems",
                newName: "IX_CartItems_ProductPieceId");

            migrationBuilder.RenameIndex(
                name: "IX_ParfumeBottleds_ProductId",
                table: "ParfumeBottles",
                newName: "IX_ParfumeBottles_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ParfumeBottles",
                table: "ParfumeBottles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_ProductPieces_ProductPieceId",
                table: "CartItems",
                column: "ProductPieceId",
                principalTable: "ProductPieces",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ParfumeBottles_Products_ProductId",
                table: "ParfumeBottles",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartItems_ProductPieces_ProductPieceId",
                table: "CartItems");

            migrationBuilder.DropForeignKey(
                name: "FK_ParfumeBottles_Products_ProductId",
                table: "ParfumeBottles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ParfumeBottles",
                table: "ParfumeBottles");

            migrationBuilder.RenameTable(
                name: "ParfumeBottles",
                newName: "ParfumeBottleds");

            migrationBuilder.RenameColumn(
                name: "ProductPieceId",
                table: "CartItems",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_CartItems_ProductPieceId",
                table: "CartItems",
                newName: "IX_CartItems_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ParfumeBottles_ProductId",
                table: "ParfumeBottleds",
                newName: "IX_ParfumeBottleds_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ParfumeBottleds",
                table: "ParfumeBottleds",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CartItems_Products_ProductId",
                table: "CartItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ParfumeBottleds_Products_ProductId",
                table: "ParfumeBottleds",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
