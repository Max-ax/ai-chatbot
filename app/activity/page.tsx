// pages/user.tsx
import React from 'react';
import AddActivity from '@/components/add-activity';
import ActivityCard from '@/components/activity-card';



const UserPage = () => {
  return (    
  <div className="container mx-auto p-4 flex w-full justify-center overflow-x-auto">
  <main className="flex flex-col lg:flex-row gap-10 w-fit">
      <section className = "grow lg:grow-0">
          <h2 className="text-2xl font-semibold mb-6">Your Activities</h2>
          <div className="inline-grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((id) => (
              <ActivityCard key={id} />
            ))}
          </div>
        </section>
        <section className="grow">
          
          <h2 className="text-2xl font-semibold mb-6">Add New Acitivity</h2>
          <AddActivity />
        </section>

      </main>
    </div>
  );
};

export default UserPage;