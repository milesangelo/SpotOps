using System;
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="i"></param>
        /// <returns></returns>
        Task<SpotResponse> GetById(int i);
        
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Task<ICollection<SpotResponse>> GetAll();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="spotResponse"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        Task<SpotResponse> Add(SpotResponse spotResponse);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<bool> Remove(int id);
    }
}