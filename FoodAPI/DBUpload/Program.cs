using System.IO;
using System.Threading;
using DBUpload.Models;

Console.WriteLine("Start:");

using (StreamReader sr = new StreamReader("recipe_data.csv"))
{
    Console.Write("Columns: ");
    Console.WriteLine(sr.ReadLine());
    using (var dc = new RecipesDatabaseContext())
    {
        using (var pb = new ProgressBar())
        {
            int i = 0; 
            while (!sr.EndOfStream)
            {
                var rec = sr.ReadLine().Split(';');

                pb.Report((double)++i/1392);
                var res = new Recipe()
                {
                    Name = rec[0],
                    Image = rec[1],
                    CookingTime = int.Parse(rec[2]),
                    Calories = int.Parse(rec[3]),
                    Portions = int.Parse(rec[4]),
                    Ingredients = rec[5],
                    Steps = rec[6],
                };
                dc.Recipes.Add(res);
                dc.SaveChanges();

            }
        }
        Console.WriteLine("Fin");
    }
}
