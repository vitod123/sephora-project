using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DeliveryMigration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "DeliveryDataSet");

            migrationBuilder.AddColumn<string>(
                name: "Apartment",
                table: "DeliveryDataSet",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Building",
                table: "DeliveryDataSet",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "DeliveryDataSet",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Country",
                table: "DeliveryDataSet",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "District",
                table: "DeliveryDataSet",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NovaPostWarehouse",
                table: "DeliveryDataSet",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PostalCode",
                table: "DeliveryDataSet",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Region",
                table: "DeliveryDataSet",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Street",
                table: "DeliveryDataSet",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UnauthedUserId",
                table: "DeliveryDataSet",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "DeliveryDataId",
                table: "AspNetUsers",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.CreateTable(
                name: "UnauthedUser",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    DeliveryDataId = table.Column<long>(type: "bigint", nullable: true),
                    RegistrationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnauthedUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UnauthedUser_DeliveryDataSet_DeliveryDataId",
                        column: x => x.DeliveryDataId,
                        principalTable: "DeliveryDataSet",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UnauthedUser_DeliveryDataId",
                table: "UnauthedUser",
                column: "DeliveryDataId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UnauthedUser");

            migrationBuilder.DropColumn(
                name: "Apartment",
                table: "DeliveryDataSet");

            migrationBuilder.DropColumn(
                name: "Building",
                table: "DeliveryDataSet");

            migrationBuilder.DropColumn(
                name: "City",
                table: "DeliveryDataSet");

            migrationBuilder.DropColumn(
                name: "Country",
                table: "DeliveryDataSet");

            migrationBuilder.DropColumn(
                name: "District",
                table: "DeliveryDataSet");

            migrationBuilder.DropColumn(
                name: "NovaPostWarehouse",
                table: "DeliveryDataSet");

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "DeliveryDataSet");

            migrationBuilder.DropColumn(
                name: "Region",
                table: "DeliveryDataSet");

            migrationBuilder.DropColumn(
                name: "Street",
                table: "DeliveryDataSet");

            migrationBuilder.DropColumn(
                name: "UnauthedUserId",
                table: "DeliveryDataSet");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "DeliveryDataSet",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<long>(
                name: "DeliveryDataId",
                table: "AspNetUsers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);
        }
    }
}
