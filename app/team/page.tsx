'use client'

import { useState } from 'react'
import Image from 'next/image'

// Sample team data - you can replace with actual team member information
const teamMembers = [
  {
    id: 1,
    name: "Jithin Sam Varghese",
    title: "Assistant Professor",
    role: "Faculty",
    image: "/images/team/jithin.jpg",
    link: "https://chroniq.in"},
  {
    id: 2,
    name: "Zhongyu Li",
    title: "PhD Candidate",
    role: "Graduate Student",
    image: "/images/team/zhongyu.jpg",
    link: "https://www.linkedin.com/in/zhongyu-li-46680924b/"},
  {
    id: 3,
    name: "Jiali Guo",
    title: "Biostatistician",
    role: "Staff",
    image: "/images/team/jiali.jpg",
    link: "https://www.jialiguo.com"  },
  {
    id: 4,
    name: "Ruwanthi Ekanayake",
    title: "MD/PhD Student",
    role: "Graduate Student",
    image: "/images/team/ruwanthi.jpg",
    link: "https://sph.emory.edu/profile/phd-student/ruwanthi-ekanayaken"
  },
  {
    id: 5,
    name: "Daniel Hua",
    title: "BS Biology 2027",
    role: "Undergraduate",
    image: "/images/team/daniel.jpg",
    link: "https://www.linkedin.com/in/daniel-hua-125322249/"
  },

  {
    id: 6,
    name: "Theo Hung",
    title: "BS Biology 2027",
    role: "Undergraduate",
    image: "/images/team/theo.jpg",
    link: "https://www.linkedin.com/in/theodore-hung-397a16279/"
  },

]

const alumni = [
  {
    id: 7,
    name: "Caroline Chizak",
    title: "BS Human Health 2026",
    role: "Alumni",
    image: "/images/team/caroline.jpg",
    link: "https://www.linkedin.com/in/caroline-chizak/",
    bio: "Applying for MPH programs"
  },


  {
    id: 8,
    name: "Krishna Sanaka",
    title: "BS Biology and Anthropology 2025",
    role: "Alumni",
    image: "/images/team/krishna.jpg",
    link: "https://www.linkedin.com/in/krishna-sanaka-b9babb214/",
    bio: "MD Student at University of Pennsylvania"
  },

   {
    id: 9,
    name: "Aamna Soniwala",
    title: "BS Human Health 2025",
    role: "Alumni",
    image: "/images/team/aamna.jpg",
    link: "https://www.linkedin.com/in/aamna-soniwala-1524561b3/",
    bio: "Applying for Dental School"
  },


   {
    id: 10,
    name: "Sophia Kim",
    title: "BS Biology and Music 2026",
    role: "Alumni",
    image: "/images/team/sophia.jpg",
    link: "",
    bio: "Applying for MD programs"
  },


]

const roles = ['All', 'Faculty', 'Staff', 'Graduate Student', 'Undergraduate', 'Alumni']

export default function TeamPage() {
  const [selectedRole, setSelectedRole] = useState('All')

  const allMembers = [...teamMembers, ...alumni]
  const filteredMembers = selectedRole === 'All' 
    ? allMembers 
    : allMembers.filter(member => member.role === selectedRole)

  const currentMembers = teamMembers
  const alumniMembers = alumni

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the researchers who are answering important questions
              at the intersection of precision medicine and public health. 
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedRole === role
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Current Team Members */}
      {(selectedRole === 'All' || selectedRole !== 'Alumni') && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Current Team Members
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentMembers
                .filter(member => selectedRole === 'All' || member.role === selectedRole)
                .map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-sm card-hover overflow-hidden"
                >
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                      {/* Fallback placeholder */}
                      <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center" style={{display: 'none'}}>
                        <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{member.title}</p>
                    <p className="text-xs text-gray-600 font-medium mb-3">{member.role}</p>
                    
                    <a
                      href={member.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium"
                    >
                      <span>View Profile</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Alumni Section */}
      {(selectedRole === 'All' || selectedRole === 'Alumni') && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Alumni
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {alumni.map((member) => (
                <div
                  key={member.id}
                  className="bg-gray-50 rounded-lg shadow-sm card-hover overflow-hidden border-2 border-gray-200"
                >
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {/* Fallback placeholder */}
                      <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center" style={{display: 'none'}}>
                        <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{member.title}</p>
                    <p className="text-xs text-gray-500 font-medium mb-3">{member.role}</p>
                    
                    <a
                      href={member.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-gray-600 hover:text-gray-700 font-medium"
                    >
                      <span>View Profile</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
