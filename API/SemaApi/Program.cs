using SemaApi.Infrastructure;
using SemaApi.Application;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// CORS policy ekle
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("MySqlConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
builder.Services.AddScoped<IVisitorService, VisitorService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// CORS'u aktif et
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
