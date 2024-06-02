// // pages/user.tsx
// import React from 'react';
// import AddActivity from '@/components/add-activity';
// import ActivityCard from '@/components/activity-card';



// const UserPage = () => {
//   return (
//     <div className="container mx-auto p-4">
//       <main className="flex flex-col lg:flex-row gap-8">
//       <section className="flex-1 w-xl">
//           <h2 className="text-2xl font-semibold mb-4">Your Activities</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-auto">
//             {[1, 2, 3, 4].map((id) => (
//               <ActivityCard key={id} />
//             ))}
//           </div>
//         </section>
//         <section className="lg:w-1/3">
//           <AddActivity />
//         </section>

//       </main>
//     </div>
//   );
// };

// export default UserPage;