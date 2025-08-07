using System;
using System.Collections.Generic;

namespace ApproximateAPI.Models;

public partial class TaskEntity
{
    public int TaskId { get; set; }

    public int UserId { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string? Priority { get; set; }

    public DateOnly? TaskDate { get; set; }

    public virtual Userdatum User { get; set; } = null!;
}
