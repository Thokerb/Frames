namespace Frames.Tests.TestUtils;

using System;
using Xunit;

/// <summary>
/// https://www.mihajakovac.com/skip-xunit-tests-in-github-pipeline/
/// </summary>
public sealed class SkipForGithubAction : FactAttribute
{
    public SkipForGithubAction()
    {
        if (IsGitHubAction())
        {
            Skip = "Ignore the test when run in Github agent.";
        }
    }

    private static bool IsGitHubAction()
        => Environment.GetEnvironmentVariable("GITHUB_ACTION") != null;
}