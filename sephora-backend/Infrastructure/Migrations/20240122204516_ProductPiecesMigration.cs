using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ProductPiecesMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarePieces");

            migrationBuilder.DropTable(
                name: "ParfumePieces");

            migrationBuilder.DropTable(
                name: "Cares");

            migrationBuilder.DropTable(
                name: "Parfumes");

            migrationBuilder.CreateTable(
                name: "ProductPieces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    InStock = table.Column<int>(type: "integer", nullable: true),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    AmountId = table.Column<int>(type: "integer", nullable: false),
                    ProductId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductPieces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductPieces_Amounts_AmountId",
                        column: x => x.AmountId,
                        principalTable: "Amounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductPieces_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductPieces_AmountId",
                table: "ProductPieces",
                column: "AmountId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPieces_ProductId",
                table: "ProductPieces",
                column: "ProductPieceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductPieces");

            migrationBuilder.CreateTable(
                name: "Cares",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cares", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cares_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Parfumes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ProductId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parfumes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Parfumes_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CarePieces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AmountId = table.Column<int>(type: "integer", nullable: false),
                    CareId = table.Column<int>(type: "integer", nullable: false),
                    InStock = table.Column<int>(type: "integer", nullable: true),
                    Price = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarePieces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarePieces_Amounts_AmountId",
                        column: x => x.AmountId,
                        principalTable: "Amounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarePieces_Cares_CareId",
                        column: x => x.CareId,
                        principalTable: "Cares",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ParfumePieces",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AmountId = table.Column<int>(type: "integer", nullable: false),
                    ParfumeId = table.Column<int>(type: "integer", nullable: false),
                    InStock = table.Column<int>(type: "integer", nullable: true),
                    Price = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParfumePieces", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ParfumePieces_Amounts_AmountId",
                        column: x => x.AmountId,
                        principalTable: "Amounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ParfumePieces_Parfumes_ParfumeId",
                        column: x => x.ParfumeId,
                        principalTable: "Parfumes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarePieces_AmountId",
                table: "CarePieces",
                column: "AmountId");

            migrationBuilder.CreateIndex(
                name: "IX_CarePieces_CareId",
                table: "CarePieces",
                column: "CareId");

            migrationBuilder.CreateIndex(
                name: "IX_Cares_ProductId",
                table: "Cares",
                column: "ProductPieceId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ParfumePieces_AmountId",
                table: "ParfumePieces",
                column: "AmountId");

            migrationBuilder.CreateIndex(
                name: "IX_ParfumePieces_ParfumeId",
                table: "ParfumePieces",
                column: "ParfumeId");

            migrationBuilder.CreateIndex(
                name: "IX_Parfumes_ProductId",
                table: "Parfumes",
                column: "ProductPieceId",
                unique: true);
        }
    }
}
