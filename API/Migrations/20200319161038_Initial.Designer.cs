﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200319161038_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("API.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateAdded");

                    b.Property<string>("ImageName");

                    b.Property<int>("StoryId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("StoryId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("API.Models.Story", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Category");

                    b.Property<string>("Content");

                    b.Property<DateTime>("DatePosted");

                    b.Property<string>("Intro");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("Stories");
                });

            modelBuilder.Entity("API.Models.Video", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Category");

                    b.Property<DateTime>("DatePosted");

                    b.Property<string>("Intro");

                    b.Property<string>("PhotoUrl");

                    b.Property<string>("Title");

                    b.Property<string>("VideoUrl");

                    b.HasKey("Id");

                    b.ToTable("Videos");
                });

            modelBuilder.Entity("API.Models.Image", b =>
                {
                    b.HasOne("API.Models.Story", "Story")
                        .WithMany("Images")
                        .HasForeignKey("StoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
