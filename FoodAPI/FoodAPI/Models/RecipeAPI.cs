namespace FoodAPI.Models
{
    public class RecipeAPI
    {
        public string Name{ get; set; }
        public string Description{ get; set; }
        public int TimeToCook{ get; set; }
        public List<string> Engredients{ get; set; }
        public int Pkid{ get; set; }
        public int Calories{ get; set; }
        public int Portions{ get; set; }
        public string Steps{ get; set; }
        public string Image{ get; set; }
    }
}
