var builder = WebApplication.CreateBuilder(args);

string? connStr = builder.Environment.IsDevelopment()
    ? builder.Configuration.GetConnectionString("RemoteDb")
    : Environment.GetEnvironmentVariable("RemoteDb");

if (connStr is null)
    throw new ApplicationException("Connection string is null");

string? envIndexPath = builder.Configuration.GetValue<string>("IndexPath");
string? indexPath = builder.Environment.IsDevelopment() && envIndexPath is not null
    ? Path.Combine(Directory.GetCurrentDirectory(), envIndexPath)
    : Environment.GetEnvironmentVariable("IndexPath");

if (indexPath is null)
    throw new ApplicationException("Index path is null");

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(opts =>
    opts.SerializerSettings.Formatting = Formatting.Indented);

builder.Services.AddCors();

builder.Services.SwaggerConfig();

builder.Services.NewtonsoftJsonConfig();

builder.Services.AddEndpointsApiExplorer();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext(connStr);

builder.Services.AddIdentity();

builder.Services.AddRepository();

// Add JWT tokens
JwtOptions? opts = null;
if (builder.Environment.IsDevelopment())
    opts = builder.Configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>();
if (!builder.Environment.IsDevelopment() || opts is null)
    opts = new JwtOptions
    {
        Issuer = Environment.GetEnvironmentVariable("JwtIssuer"),
        Key = Environment.GetEnvironmentVariable("JwtKey"),
        Lifetime = Convert.ToInt32(
            Environment.GetEnvironmentVariable("JwtLifetime")
        ),
        GoogleClientId = Environment.GetEnvironmentVariable("GoogleClientId"),
        GoogleClientSecret = Environment.GetEnvironmentVariable("GoogleClientSecret")
    };
builder.Services.AddJwt(opts);
builder.Services.AddAuthorization();

// add custom services
builder.Services.AddCustomServices(opts);

// add auto mapper
builder.Services.AddAutoMapper();

// add fluent validators
builder.Services.AddValidators();

// add file service
builder.Services.AddFileService(builder.Environment.IsDevelopment());

// add exception handler
builder.Services.AddExceptionHandler<ExceptionHandler>();
builder.Services.AddProblemDetails();

// add search service
builder.Services.AddSearchService(indexPath);

var app = builder.Build();

app.UseExceptionHandler();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHsts();
app.UseHttpsRedirection();

app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.AllowAnyOrigin();
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
