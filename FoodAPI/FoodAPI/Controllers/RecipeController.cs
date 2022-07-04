using Microsoft.AspNetCore.Mvc;
using FoodAPI.DB;
using FoodAPI.Models;


namespace FoodAPI.Controllers
{
    [Route("recipes")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        // GET: api/<RecipeController>
        [HttpGet("/ingredients")]
        public IEnumerable<RecipeAPI> Get(string include, string? remove, bool name = true, bool time = false, bool cals = false, bool avail = false,  int count = 10, int skip = 0)
        {
            using (var dc = new RecipesDatabaseContext())
            {
                string[] includeList = include.Split(';');                
                var res = new List<RecipeAPI>();
                var recipes = dc.Recipes.ToList();
                foreach (var ingredient in includeList)
                {
                    recipes = recipes.Where(n => n.Ingredients.ToLower().Contains(ingredient.ToLower())).ToList();
                }
                if (remove != null)
                {
                    string[] excludeList = remove.Split(';');
                    foreach (var ingredient in excludeList)
                    {
                    recipes = recipes.Where(n => !n.Ingredients.ToLower().Contains(ingredient.ToLower())).ToList();
                    }
                }

                if (recipes == null) return null;

                if(name) recipes = recipes.OrderBy(n => n.Name).ToList();
                if(cals) recipes = recipes.OrderBy(n => n.Calories).ToList();
                if(time) recipes = recipes.OrderBy(n => n.CookingTime).ToList();
                if(avail) recipes = recipes.OrderBy(n => n.Ingredients.Split(",").Where(c => !includeList.Contains(c)).ToArray().Length).ToList();

                recipes = recipes.Skip(skip).Take(count).ToList();

                foreach (var recipe in recipes)
                {
                    res.Add(new RecipeAPI()
                    {
                        Pkid = recipe.Pkid,
                        Name = recipe.Name,
                        Calories = recipe.Calories,
                        Portions = recipe.Portions,
                        TimeToCook = recipe.CookingTime,
                        Image = recipe.Image.Replace("c88x88", "c300x300"),
                        Engredients = recipe.Ingredients.Split(',').ToList()
                    });
                }
                return res;
            }
            return null;
        }

        // GET api/<RecipeController>/5
        [HttpGet("{id}")]
        public RecipeAPI Get(int id)
        {
            using (var dc = new RecipesDatabaseContext())
            {
                var recipe = dc.Recipes.Where(n => n.Pkid == id).FirstOrDefault();
                if (recipe == null) return null;
 
                return ( new RecipeAPI()
                {
                    Pkid = recipe.Pkid,
                    Name = recipe.Name,
                    Calories = recipe.Calories,
                    Description = "description?",
                    Portions = recipe.Portions,
                    Steps = recipe.Steps,
                    TimeToCook = recipe.CookingTime,
                    Image = recipe.Image.Replace("c88x88", "c300x300"),
                    Engredients = recipe.Ingredients.Split(',').ToList()
                });
            }
            return null;
        }

        [HttpGet("/byname")]
        public IEnumerable<RecipeAPI> Get(string recipeName, bool name = true, bool time = false, bool cals = false, bool avail = false, int count = 10, int skip = 0)
        {
            using (var dc = new RecipesDatabaseContext())
            {
                var res = new List<RecipeAPI>();
                var recipes = dc.Recipes.Where(n => n.Name.Contains(recipeName)).ToList();

                if (recipes == null) return null;

                if (name) recipes = recipes.OrderBy(n => n.Name).ToList();
                if (cals) recipes = recipes.OrderBy(n => n.Calories).ToList();
                if (time) recipes = recipes.OrderBy(n => n.CookingTime).ToList();

                recipes = recipes.Skip(skip).Take(count).ToList();

                foreach (var recipe in recipes)
                {
                    res.Add(new RecipeAPI()
                    {
                        Pkid = recipe.Pkid,
                        Name = recipe.Name,
                        Calories = recipe.Calories,
                        Description = "description?",
                        Portions = recipe.Portions,
                        Steps = recipe.Steps,
                        TimeToCook = recipe.CookingTime,
                        Image = recipe.Image.Replace("c88x88", "c300x300"),
                        Engredients = recipe.Ingredients.Split(',').ToList()
                    });
                }
                return res;
            }
            return null;
        }