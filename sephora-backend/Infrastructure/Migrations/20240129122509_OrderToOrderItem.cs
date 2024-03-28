using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class OrderToOrderItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_DeliveryEntity_DeliveryDataId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_DeliveryEntity_DeliveryDataId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "OrderProductEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DeliveryEntity",
                table: "DeliveryEntity");

            migrationBuilder.RenameTable(
                name: "DeliveryEntity",
                newName: "DeliveryDataSet");

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryId",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "DeliveryDataId",
                table: "Orders",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProductEntityId",
                table: "Orders",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DeliveryDataSet",
                table: "DeliveryDataSet",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    ProductPieceId = table.Column<int>(type: "integer", nullable: false),
                    OrderId = table.Column<long>(type: "bigint", nullable: false),
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Quantity = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_ProductPieces_ProductPieceId",
                        column: x => x.ProductPieceId,
                        principalTable: "ProductPieces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ProductEntityId",
                table: "Orders",
                column: "ProductEntityId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductPieceId",
                table: "OrderItems",
                column: "ProductPieceId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_DeliveryDataSet_DeliveryDataId",
                table: "AspNetUsers",
                column: "DeliveryDataId",
                principalTable: "DeliveryDataSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_DeliveryDataSet_DeliveryDataId",
                table: "Orders",
                column: "DeliveryDataId",
                principalTable: "DeliveryDataSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Products_ProductEntityId",
                table: "Orders",
                column: "ProductEntityId",
                principalTable: "Products",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_DeliveryDataSet_DeliveryDataId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_DeliveryDataSet_DeliveryDataId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Products_ProductEntityId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropIndex(
                name: "IX_Orders_ProductEntityId",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DeliveryDataSet",
                table: "DeliveryDataSet");

            migrationBuilder.DropColumn(
                name: "ProductEntityId",
                table: "Orders");

            migrationBuilder.RenameTable(
                name: "DeliveryDataSet",
                newName: "DeliveryEntity");

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryId",
                table: "Orders",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<long>(
                name: "DeliveryDataId",
                table: "Orders",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DeliveryEntity",
                table: "DeliveryEntity",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "OrderProductEntity",
                columns: table => new
                {
                    OrdersId = table.Column<long>(type: "bigint", nullable: false),
                    ProductsId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProductEntity", x => new { x.OrdersId, x.ProductsId });
                    table.ForeignKey(
                        name: "FK_OrderProductEntity_Orders_OrdersId",
                        column: x => x.OrdersId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProductEntity_Products_ProductsId",
                        column: x => x.ProductsId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderProductEntity_ProductsId",
                table: "OrderProductEntity",
                column: "ProductsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_DeliveryEntity_DeliveryDataId",
                table: "AspNetUsers",
                column: "DeliveryDataId",
                principalTable: "DeliveryEntity",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_DeliveryEntity_DeliveryDataId",
                table: "Orders",
                column: "DeliveryDataId",
                principalTable: "DeliveryEntity",
                principalColumn: "Id");
        }
    }
}
