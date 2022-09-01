using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using jetWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Runtime;

namespace jetWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly DataContext _context;
        private IWebHostEnvironment _webHostEnvironment;
        public ProductsController(DataContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProducts(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return product;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducts(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            // if (product.ImageUrl != null)
            // {
            //     string folder = "products/img";
            //     folder += Guid.NewGuid().ToString() + "_" + product.ProductName;

            //     product.ImageUrl = folder;
            //     string serverFolder = Path.Combine(_webHostEnvironment.WebRootPath, folder);

            //     await product.ImageUrl.CopyToAsync(new FileStream(serverFolder, FileMode.Create));
                
            // }
            if (product.ImageFile != null)
            {
                string folder = _webHostEnvironment.WebRootPath;
                string fileName = Path.GetFileNameWithoutExtension(product.ImageUrl);
                string extension = Path.GetExtension(product.ImageUrl);
                product.ImageUrl = fileName = fileName + Guid.NewGuid().ToString() + extension;
                string path = Path.Combine(folder + "/Image", fileName);
                using(var FileStream = new FileStream(path, FileMode.Create))
                {
                    await product.ImageFile!.CopyToAsync(FileStream);
                }
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}