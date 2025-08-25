using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Project.Function;
using Project.Mappers;

namespace AzureFunctions.Database
{
    public class ProjectRepo
    {
        private readonly ProjectContext _ctx;

        public ProjectRepo(ProjectContext ctx)
        {
            _ctx = ctx;
        }

        //Businesses
         public string AddBusiness(UpdateBusinessRequestModel request)
         {
            var entity = request.ToEntity();

            var now = DateTime.Now;
            entity.CreatedAt = now;
            entity.UpdatedAt = now;

            _ctx.Businesses.Add(entity);
            SaveAll();

            return entity.Id.ToString();
         }

        public string UpdateBusiness(UpdateBusinessRequestModel request)
        {
            var entity = request.ToEntity();
            var entityToUpdate = _ctx.Businesses.FirstOrDefault(c => c.Id == entity.Id);

            entityToUpdate.BusinessName = entity.BusinessName;
            entityToUpdate.Email = entity.Email;
            entityToUpdate.PhoneNumber = entity.PhoneNumber;
            entityToUpdate.BusinessType = entity.BusinessType;
            entityToUpdate.DefaultOfferingName = entity.DefaultOfferingName;
            entityToUpdate.DefaultOfferingPrice = entity.DefaultOfferingPrice;
            entityToUpdate.Address = entity.Address;
            entityToUpdate.MaxCapacity = entity.MaxCapacity;
            entityToUpdate.StartTime = entity.StartTime;
            entityToUpdate.EndTime = entity.EndTime;
            entityToUpdate.Interval = entity.Interval;

            SaveAll();

            return entity.Id.ToString();
        }

        public IEnumerable<UpdateBusinessResponseModel> GetAllBusinesses()
        {
           return _ctx.Businesses
                  .Include(b => b.Reservations)
                  .Include(b => b.BusinessOfferings)
                  .Select(x => x.ToResponse());
        }


      public UpdateBusinessResponseModel GetBusinessByAttribute(string value)
      {
         return GetAllBusinesses().FirstOrDefault(x => x.Id.ToString() == value || x.BusinessName.ToString() == value || x.Email.ToString() == value);
      }

        //Reservations
        public string AddReservation(UpdateReservationRequestModel request)
         {
            var entity = request.ToEntity();

            var now = DateTime.Now;
            entity.CreatedAt = now;
            entity.UpdatedAt = now;

            _ctx.Reservations.Add(entity);
            SaveAll();

            return entity.Id.ToString();
         }

        public string UpdateReservation(UpdateReservationRequestModel request)
        {
            var entity = request.ToEntity();
            var entityToUpdate = _ctx.Reservations.FirstOrDefault(c => c.Id == entity.Id);

            entityToUpdate.FirstName = entity.FirstName;
            entityToUpdate.LastName = entity.LastName;
            entityToUpdate.Email = entity.Email;
            entityToUpdate.ReservationDate = entity.ReservationDate;
            entityToUpdate.PartySize = entity.PartySize;
            entityToUpdate.StripeSessionId = entity.StripeSessionId;
            entityToUpdate.Notes = entity.Notes;
            entityToUpdate.PhoneNumber = entity.PhoneNumber;
            entityToUpdate.OfferingId = entity.OfferingId;
            entityToUpdate.BusinessId = entity.BusinessId;
            entityToUpdate.UpdatedAt = DateTime.Now;

            SaveAll();

            return entity.Id.ToString();
        }

        public IEnumerable<Reservation> GetAllReservations()
        {
           return _ctx.Reservations;
        }

        public Reservation GetReservationById(string id)
        {
           return GetAllReservations().FirstOrDefault(x => x.Id.ToString() == id);
        }

        public Reservation GetReservationByStripeCheckoutSession(string id)
        {
           return GetAllReservations().FirstOrDefault(x => x.StripeSessionId.ToString() == id);
        }


        // Save
        private bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }

    }
}