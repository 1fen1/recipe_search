using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DBUpload.Models
{
    public partial class RecipesDatabaseContext : DbContext
    {
        public RecipesDatabaseContext()
        {
        }

        public RecipesDatabaseContext(DbContextOptions<RecipesDatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Recipe> Recipes { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=***;Database=RecipesDatabase;User ID=server;Password=***;Trusted_Connection=False;Encrypt=True;Connection Timeout=2400;MultipleActiveResultSets=True;trustServerCertificate=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Recipe>(entity =>
            {
                entity.HasKey(e => e.Pkid)
                    .HasName("PK_recipes_pkid");

                entity.ToTable("recipes");

                entity.Property(e => e.Pkid).HasColumnName("pkid");

                entity.Property(e => e.Calories).HasColumnName("calories");

                entity.Property(e => e.CookingTime).HasColumnName("cooking_time");

                entity.Property(e => e.Image)
                    .HasMaxLength(50)
                    .HasColumnName("image");

                entity.Property(e => e.Ingredients)
                    .HasMaxLength(255)
                    .HasColumnName("ingredients");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.Portions).HasColumnName("portions");

                entity.Property(e => e.Steps)
                    .HasMaxLength(1024)
                    .HasColumnName("steps");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
