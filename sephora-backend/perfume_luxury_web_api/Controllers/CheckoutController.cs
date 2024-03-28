namespace perfume_luxury_web_api.Controllers;

[ApiController, Route("[controller]")]
public class CheckoutController(
    ICheckoutService checkoutService
) : ControllerBase
{
    /**
     * Create an order (for unauthenticated users and SudoAdmins,
     * who want to create an order for someone else,
     * like for a customer who called them)
     */
    [HttpPost("unauthed")]
    public async Task<IActionResult> Checkout([FromBody] CheckoutDto dto)
    {
        await checkoutService.CheckoutUnauthed(dto.CartItems, dto.DeliveryDto);
        return Ok();
    }

    [HttpPost, Authorize]
    public async Task<IActionResult> Checkout()
    {
        await checkoutService.CheckoutAuthed(User);
        return Ok();
    }

    [HttpPut("cancel/{orderId:long}"), Authorize]
    public async Task<IActionResult> CancelOrder(long orderId)
    {
        await checkoutService.CancelOrder(orderId, User);
        return Ok();
    }

    [HttpPut("SudoAdmin/status"), Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> ChangeStatus([FromBody] ChangeStatusDto dto)
    {
        await checkoutService.ChangeStatus(dto);
        return Ok();
    }

    [HttpGet("SudoAdmin/{orderId:long}"), Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> GetById(long orderId)
        => Ok(await checkoutService.GetById(orderId));

    [HttpGet("SudoAdmin/all"), Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> GetAll()
        => Ok(await checkoutService.Get().ToListAsync());

    // Manipulate status of orders via this method in SudoAdmin panel
    [HttpPut("SudoAdmin"), Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> Edit([FromBody] OrderDto orderDto)
    {
        if (!ModelState.IsValid) 
            throw new ArgumentException("The model is not valid.");

        await checkoutService.Edit(orderDto);
        return Ok();
    }

    [HttpDelete("SudoAdmin/{orderId:long}"), Authorize(Roles = "SudoAdmin,Admin")]
    public async Task<IActionResult> Delete(long orderId)
    {
        await checkoutService.Delete(orderId);
        return Ok();
    }
}
