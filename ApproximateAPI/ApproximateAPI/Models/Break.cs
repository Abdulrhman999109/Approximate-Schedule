using System;
using System.Collections.Generic;

namespace ApproximateAPI.Models;

public partial class Break
{
    public int BreakId { get; set; }

    public string Breakname { get; set; } = null!;

    public TimeOnly Starttime { get; set; }

    public TimeOnly Endtime { get; set; }

    public int UserId { get; set; }

    public virtual Userdatum User { get; set; } = null!;
}
