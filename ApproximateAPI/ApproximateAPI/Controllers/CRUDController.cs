using ApproximateAPI.Models;
using ApproximateAPI.Dto;
using Microsoft.AspNetCore.Mvc;
using static ApproximateAPI.Repositories.IRepository;

[ApiController]
[Route("api/")]
public class CRUDController : ControllerBase
{
    private readonly IRepository<TaskEntity> _taskRepository;
    private readonly IRepository<Break> _breakRepository;

    public CRUDController(IRepository<TaskEntity> taskRepository, IRepository<Break> breakRepository)
    {
        _taskRepository = taskRepository;
        _breakRepository = breakRepository;
    }

    
    int GetCurrentUserId()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserId");
        return userIdClaim != null ? int.Parse(userIdClaim.Value) : 0;
    }

    [HttpGet("task and break")]

    public async Task<IActionResult> GetTasksAndBreaks()
    {
        int currentUserId = GetCurrentUserId();
        if (currentUserId == 0)
            return BadRequest("You must be logged in");

        var tasks = (await _taskRepository.GetAllAsync())
            .Where(t => t.UserId == currentUserId)
            .ToList();
        var breaks = (await _breakRepository.GetAllAsync())
            .Where(t => t.UserId == currentUserId)
            .ToList();


        return Ok(new
        {
            Tasks=tasks,
            Breaks=breaks

        }
            );
    }
    [HttpGet("tasks")]
    public async Task<IActionResult> GetTasks()
    {
        int currentUserId = GetCurrentUserId();
        if (currentUserId == 0)
            return BadRequest("You must be logged in");
        var tasks = (await _taskRepository.GetAllAsync())
            .Where(b => b.UserId == currentUserId)
            .Select(b => new TaskDto
            {
                TaskId = b.TaskId,
                Title = b.Title,
                Description = b.Description,
                Priority = b.Priority,
                TaskDate = b.TaskDate.HasValue ? b.TaskDate.Value.ToString("yyyy-MM-dd") : null,
            })
            .ToList();
        return Ok(tasks);
    }

    [HttpGet("tasks/{id}")]
    public async Task<IActionResult> GetTaskById(int id)
    {
        int currentUserId = GetCurrentUserId();
        var task = await _taskRepository.GetByIdAsync(id);

        if (task == null || task.UserId != currentUserId)
            return NotFound("Task not found or you don't have access.");

        return Ok(task);
    }

    [HttpPost("tasks")]
    public async Task<IActionResult> AddTask([FromBody] TaskDto taskdto)
    {
        int currentUserId = GetCurrentUserId();

        if (currentUserId == 0)
            return BadRequest("You must be logged in");
        
        var task = new TaskEntity
        {
            Title = taskdto.Title,
            Description = taskdto.Description,
            Priority = taskdto.Priority,
            TaskDate = taskdto.TaskDate!=null?DateOnly.FromDateTime(DateTime.Parse(taskdto.TaskDate)):null, 
            UserId = currentUserId 
        };

        await _taskRepository.AddAsync(task);
        return CreatedAtAction(nameof(GetTaskById), new { id = task.TaskId }, task);
    }


    [HttpPut("tasks/{id}")]
    public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskDto taskdto)
    {
        int currentUserId = GetCurrentUserId();
        var existingTask = await _taskRepository.GetByIdAsync(id);

        if (existingTask == null || existingTask.UserId != currentUserId)
            return NotFound("Task not found or you don't have access.");

        existingTask.Title = taskdto.Title;
        existingTask.Description = taskdto.Description;
        existingTask.Priority = taskdto.Priority;
        existingTask.TaskDate = taskdto.TaskDate != null ? DateOnly.FromDateTime(DateTime.Parse(taskdto.TaskDate)) : null;

        await _taskRepository.UpdateAsync(existingTask);
        return NoContent();
    }


    [HttpDelete("tasks/{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        int currentUserId = GetCurrentUserId();
        var task = await _taskRepository.GetByIdAsync(id);

        if (task == null || task.UserId != currentUserId)
            return NotFound("Task not found or you don't have access.");

        await _taskRepository.DeleteAsync(id);
        return NoContent();
    }

    [HttpGet("  breaks")]
    public async Task<IActionResult> GetBreaks()
    {
        int currentUserId = GetCurrentUserId();
        if (currentUserId == 0)
            return BadRequest("You must be logged in");
        var breaks = (await _breakRepository.GetAllAsync())
            .Where(b => b.UserId == currentUserId)
            .Select(b => new BreakDto
            {
                BreakId = b.BreakId,
                BreakName = b.Breakname,
                StartTime = b.Starttime.ToString("HH:mm"),
                EndTime = b.Endtime.ToString("HH:mm")
            })
            .ToList();
        return Ok(breaks);
    }

    
    [HttpGet("breaks/{id}")]
    public async Task<IActionResult> GetBreakById(int id)
    {
        int currentUserId = GetCurrentUserId();
        var breakEntity = await _breakRepository.GetByIdAsync(id);

        if (breakEntity == null || breakEntity.UserId != currentUserId)
            return NotFound("Break not found or you don't have access.");

        var breakDto = new BreakDto
        {
            BreakName = breakEntity.Breakname,
            StartTime = breakEntity.Starttime.ToString("HH:mm"),
            EndTime = breakEntity.Endtime.ToString("HH:mm")
        };

        return Ok(breakDto);
    }

    
    [HttpPost("breaks")]
    public async Task<IActionResult> AddBreak([FromBody] BreakDto breakDto)
    {
        int currentUserId = GetCurrentUserId();

        if (currentUserId == 0)
            return BadRequest("You must be logged in");
        var breakEntity = new Break
        {
            Breakname = breakDto.BreakName,
            Starttime = TimeOnly.Parse(breakDto.StartTime), 
            Endtime = TimeOnly.Parse(breakDto.EndTime),     
            UserId = currentUserId
        };

        await _breakRepository.AddAsync(breakEntity);
        return CreatedAtAction(nameof(GetBreakById), new { id = breakEntity.BreakId }, breakDto);
    }

    
    [HttpPut(" update breaks/{id}")]
    public async Task<IActionResult> UpdateBreak(int id, [FromBody] BreakDto breakDto)
    {
        int currentUserId = GetCurrentUserId();
        var existingBreak = await _breakRepository.GetByIdAsync(id);

        if (existingBreak == null || existingBreak.UserId != currentUserId)
            return NotFound("Break not found or you don't have access.");

        existingBreak.Breakname = breakDto.BreakName;
        existingBreak.Starttime = TimeOnly.Parse(breakDto.StartTime);
        existingBreak.Endtime = TimeOnly.Parse(breakDto.EndTime);

        await _breakRepository.UpdateAsync(existingBreak);
        return NoContent();
    }

    
    [HttpDelete("breaks/{id}")]
    public async Task<IActionResult> DeleteBreak(int id)
    {
        int currentUserId = GetCurrentUserId();
        var breakEntity = await _breakRepository.GetByIdAsync(id);

        if (breakEntity == null || breakEntity.UserId != currentUserId)
            return NotFound("Break not found or you don't have access.");

        await _breakRepository.DeleteAsync(id);
        return NoContent();
    }
}