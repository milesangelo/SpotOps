using System.Security.Claims;
using System.Security.Principal;
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

        public Mock<IHttpContextAccessor> GetMockWithUser()
        {
            var mockHttpContextAccessor = GetDefaultMock();
            
            var userToTest = "User";
            string[] roles = null;

            var fakeIdentity = new GenericIdentity(userToTest);
            var principal = new GenericPrincipal(fakeIdentity, roles);
            mockHttpContextAccessor.Setup(_ => _.HttpContext.User).Returns(principal);
            
            // mockHttpContextAccessor.Setup(x => x.HttpContext.User.FindFirst(It.IsAny<string>()))
            //     .Returns(new Claim("name", "Sally McButtkiss")); //thanks, randi

            mockHttpContextAccessor.Setup(_ => _.HttpContext.User.FindFirst(It.IsAny<string>()))
                .Returns(new Claim(ClaimTypes.NameIdentifier, "test_name_identifier")); 

            return mockHttpContextAccessor;
        }
    }
}