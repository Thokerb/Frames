using Microsoft.Extensions.Configuration;
using NSubstitute;

namespace Frames.Tests.TestUtils;

public static class ConfigurationMock
{
    public static IConfiguration CreateMock()
    {
        var configuration = Substitute.For<IConfiguration>();
        configuration.GetConnectionString("MongoDB").Returns("mongodb://user:pass@localhost:27017");
        configuration.GetValue<string>("MongoDB:DatabaseName").Returns("test-db");
        return configuration;
    }
} 