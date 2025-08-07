namespace ApproximateAPI.Dto
{
    public class TaskDto
    {
        public int TaskId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? Priority { get; set; }
        public string? TaskDate { get; set; }
    }
}
