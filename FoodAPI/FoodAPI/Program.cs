var builder = WebApplication.CreateBuilder(args); 
string SpecificOrigins = "SpecificOrigins";

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: SpecificOrigins,
                      builder =>
                      {
                          builder//.WithOrigins("local","127.0.0.1")
                                .AllowAnyOrigin()
                                .AllowAnyMethod()
                                .AllowAnyHeader();
                      });
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); 
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseCors(SpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
