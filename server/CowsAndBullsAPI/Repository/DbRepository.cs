using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CowsAndBullsAPI.Repository.Contracts;
using CowsAndBullsAPI.Models;

namespace CowsAndBullsAPI.Repository
{
    public class DbRepository<TEntity> : IRepository<TEntity>, IDisposable
        where TEntity : class
    {
        private readonly CowsAndBullsContext _context;
        private readonly DbSet<TEntity> _dbSet;

        public DbRepository(CowsAndBullsContext context)
        {
            this._context = context;
            this._dbSet = this._context.Set<TEntity>();
        }

        public async Task<TEntity> AddAsync(TEntity entity)
        {
            await this._dbSet.AddAsync(entity);
            return entity;
        }

        public IQueryable<TEntity> All()
        {
            return this._dbSet;
        }

        public void Delete(TEntity entity)
        {
            this._dbSet.Remove(entity);
        }

        public void Update(TEntity entity)
        {
            this._dbSet.Update(entity);
            this._context.SaveChanges();
        }

        public Task<int> SaveChangesAsync()
        {
            return this._context.SaveChangesAsync();
        }

        public void Dispose()
        {
            this._context.Dispose();
        }
    }
}