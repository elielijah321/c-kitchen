namespace Project.Function
{
    public static class GuidGenerator
    {
        public static string CreateGuid()
        {
            return System.Guid.NewGuid().ToString();
        }
    }
}