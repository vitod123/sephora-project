using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class OrderDelivery : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_DeliveryDataSet_DeliveryDataId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_DeliveryDataId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "DeliveryDataId",
                table: "Orders");

            migrationBuilder.AlterColumn<long>(
                name: "DeliveryId",
                table: "Orders",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Relational:ColumnOrder", 0);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DeliveryId",
                table: "Orders",
                column: "DeliveryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_DeliveryDataSet_DeliveryId",
                table: "Orders",
                column: "DeliveryId",
                principalTable: "DeliveryDataSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_DeliveryDataSet_DeliveryId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_DeliveryId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "DeliveryId",
                table: "Orders",
                type: "integer",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .OldAnnotation("Relational:ColumnOrder", 0);

            migrationBuilder.AddColumn<long>(
                name: "DeliveryDataId",
                table: "Orders",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_DeliveryDataId",
                table: "Orders",
                column: "DeliveryDataId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_DeliveryDataSet_DeliveryDataId",
                table: "Orders",
                column: "DeliveryDataId",
                principalTable: "DeliveryDataSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
