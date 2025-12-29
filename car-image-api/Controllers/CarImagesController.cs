using Microsoft.AspNetCore.Mvc;

namespace car_image_api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CarImagesController(IWebHostEnvironment env) : ControllerBase
    {
        private readonly IWebHostEnvironment _env = env;

        [HttpGet]
        public IActionResult GetCarImageUrl(
            [FromQuery] string make,
            [FromQuery] string model,
            [FromQuery] string year,
            [FromQuery] string angle = "aggressive")
        {
            if (string.IsNullOrWhiteSpace(make) || string.IsNullOrWhiteSpace(model) || string.IsNullOrWhiteSpace(year))
            {
                return BadRequest("Make, model, and year are required.");
            }

            make = make.ToLower();
            model = model.ToLower();
            angle = angle.ToLower();

            // Directory where images are stored
            var dirPath = Path.Combine(_env.WebRootPath, "images", "cars", make, model, year);

            string? imageUrl;

            if (Directory.Exists(dirPath))
            {
                // Look for a file that contains the angle in its name (case-insensitive)
                var files = Directory.GetFiles(dirPath, "*.*")
                                      .Where(f => f.EndsWith(".png", StringComparison.OrdinalIgnoreCase) ||
                                                  f.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) ||
                                                  f.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase))
                                      .ToArray();
                var match = files.FirstOrDefault(f => Path.GetFileName(f).Contains(angle, StringComparison.CurrentCultureIgnoreCase));

                if (match != null)
                {
                    var fileName = Path.GetFileName(match);
                    imageUrl = $"{Request.Scheme}://{Request.Host}/images/cars/{make}/{model}/{year}/{fileName}";
                }
                else
                {
                    imageUrl = $"{Request.Scheme}://{Request.Host}/images/cars/default/car.png";
                }
            }
            else
            {
                imageUrl = $"{Request.Scheme}://{Request.Host}/images/cars/default/car.png";
            }

            return Ok(new { imageUrl });
        }
    }
}
