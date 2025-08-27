using AzureFunctions.Database;

namespace Project.Function
{
    public static class RepositoryWrapper
    {
        public static ProjectRepo GetRepo()
        {
            return new ProjectRepo(new ProjectContext());
        }
    }
}