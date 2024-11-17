import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Building2,
  Briefcase,
  GraduationCap,
  Mail,
  User,
  Calendar,
  FileText,
  Plus,
  X
} from "lucide-react";
import { getProfile,updateProfile } from '../../services/user.service';
export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfileData, setNewProfileData] = useState({
    selfImages: [],
    description: "",
    experiences: [],
    major1: "",
    major2: "",
    seniority: ""
  });

  const { id } = useParams();

  function capitalizeFirstLetter(text) {
    if(!text) return "";
    let textWithoutUnderscore = text.replace(/_/g, ' ');
    return textWithoutUnderscore
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const fetchData = async () => {
    const res = await getProfile(id);
    res.major1 = capitalizeFirstLetter(res.major1);
    res.major2 = capitalizeFirstLetter(res.major2);
    setProfile(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleDetailChange(e) {
    setNewProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleExperienceChange(e, index) {
    const { name, value } = e.target;
    setNewProfileData(prev => {
      const updatedExperiences = [...prev.experiences];
      updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
      return { ...prev, experiences: updatedExperiences };
    });
  }

  function handleIncreaseExperience() {
    setNewProfileData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { organization: "", position: "", description: "" }
      ]
    }));
  }

  function submitProfileChanges() {
    const response = updateProfile(newProfileData);
    console.log(response);
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {!profile ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg"
                      />
                      <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-50">
                        <User className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{profile.username}</h2>
                      <div className="flex items-center text-gray-500 mt-1">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{profile.email}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <GraduationCap className="h-5 w-5" />
                        <span>{profile.major1 || "Undecided"}</span>
                      </div>
                      {profile.major2 && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <GraduationCap className="h-5 w-5" />
                          <span>{profile.major2}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="h-5 w-5" />
                        <span>Class of {profile.seniority}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FileText className="h-5 w-5" />
                        <a href="#" className="text-blue-600 hover:underline">Download Resume</a>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="font-semibold text-gray-900 mb-2">About Me</h3>
                      <p className="text-gray-600">{profile.description || "No description provided"}</p>
                    </div>

                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {profile.experiences?.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Experience</h3>
                  <div className="space-y-6">
                    {profile.experiences.map((exp, index) => (
                      <div key={index} className="border-l-2 border-blue-500 pl-4 pb-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                            <p className="text-gray-600">{exp.organization}</p>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Edit Profile</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={newProfileData.username}
                    onChange={handleDetailChange}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newProfileData.email}
                    onChange={handleDetailChange}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Major 1
                    </label>
                    <input
                      type="text"
                      name="major1"
                      value={capitalizeFirstLetter(newProfileData.major1)}
                      onChange={handleDetailChange}
                      placeholder="Enter your first major"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Major 2
                    </label>
                    <input
                      type="text"
                      name="major2"
                      value={capitalizeFirstLetter(newProfileData.major2)}
                      onChange={handleDetailChange}
                      placeholder="Enter your second major"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    About Me
                  </label>
                  <textarea
                    name="description"
                    value={newProfileData.description}
                    onChange={handleDetailChange}
                    placeholder="Write something about yourself"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Experiences
                    </label>
                    <button
                      onClick={handleIncreaseExperience}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Experience
                    </button>
                  </div>

                  <div className="space-y-4">
                    {newProfileData.experiences.map((experience, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-gray-500" />
                              <input
                                value={experience.organization}
                                name="organization"
                                placeholder="Organization"
                                onChange={(e) => handleExperienceChange(e, index)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-gray-500" />
                              <input
                                value={experience.position}
                                name="position"
                                placeholder="Position"
                                onChange={(e) => handleExperienceChange(e, index)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>
                        <textarea
                          value={experience.description}
                          name="description"
                          placeholder="Description of your role and achievements"
                          onChange={(e) => handleExperienceChange(e, index)}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resume
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">Upload a PDF or Word document</p>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={submitProfileChanges}
                    className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}