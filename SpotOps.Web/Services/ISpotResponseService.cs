using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SpotOps.Models;
using SpotOps.ResponseModels;

namespace SpotOps.Services
{
    public interface ISpotResponseService
    {
        Task<SpotResponse> GetById(int i);
        Task<ICollection<SpotResponse>> GetAsync();
    }
}