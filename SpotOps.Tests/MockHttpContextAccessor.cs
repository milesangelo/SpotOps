using Microsoft.AspNetCore.Http;
using Moq;

namespace SpotOps.Tests
{
    public class MockHttpContextAccessor
    {
        public Mock<IHttpContextAccessor> GetDefaultMock()
        {
            var mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
            var httpContext = new DefaultHttpContext();
            mockHttpContextAccessor.Setup(_ => _.HttpContext).Returns(httpContext);
            return mockHttpContextAccessor;
        }
    }
}