using System.Collections.Generic;

public static class ServiceLocator
{
    private static Dictionary<System.Type, object> services =
        new Dictionary<System.Type, object>();

    public static void Register<T>(T service)
    {
        services[typeof(T)] = service;
    }

    public static T Get<T>()
    {
        return (T)services[typeof(T)];
    }
}
