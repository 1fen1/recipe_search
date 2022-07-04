using System;
using System.Collections.Generic;

namespace FoodAPI.DB
{
    public partial class Recipe
    {
        public int Pkid { get; set; }
        public string Name { get; set; } = null!;
        public int CookingTime { get; set; }
        public int Calories { get; set; }
        public int Portions { get; set; }
        public string Steps { get; set; } = null!;
        public string Ingredients { get; set; } = null!;
        public string Image { get; set; } = null!;
    }
}
