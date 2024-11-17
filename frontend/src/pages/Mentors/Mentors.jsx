import { useEffect, useState } from "react";
import { getAllProfiles } from "../../services/user.service";
import { Briefcase, GraduationCap, User } from "lucide-react";

export default function Mentors() {
  const [allProfiles, setAllProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  function capitalizeFirstLetter(text) {
    if (!text) return;
    let textWithoutUnderscore = text.replace(/_/g, ' ');
    // Convert the entire string to lowercase first, then capitalize the first letter
    return textWithoutUnderscore
      .toLowerCase() // Convert the entire string to lowercase
      .split(' ')    // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' ');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllProfiles();
        setAllProfiles(res);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Mentors</h1>
          <p className="text-lg text-gray-600">Connect with experienced mentors who can guide you on your journey</p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {allProfiles.length > 0 ? (
            allProfiles.map((profile, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 flex-shrink-0">
                    <img
                      className="h-64 w-full object-cover md:h-full"
                      src={
                        profile.selfImages && profile.selfImages.length > 0
                          ? profile.selfImages[0].url
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      alt={profile.username}
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">{profile.username}</h2>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {profile.seniority}
                      </span>
                    </div>

                    <div className="flex items-center mb-4 text-gray-600">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      <span>{capitalizeFirstLetter(profile.major1)} {profile.major2 && `& ${capitalizeFirstLetter(profile.major2)}`}</span>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <User className="h-5 w-5 mr-2 text-gray-600" />
                        <h3 className="font-semibold text-gray-900">About</h3>
                      </div>
                      <p className="text-gray-600 line-clamp-3">{profile.description}</p>
                    </div>

                    {profile.experiences && profile.experiences.length > 0 && (
                      <div>
                        <div className="flex items-center mb-2">
                          <Briefcase className="h-5 w-5 mr-2 text-gray-600" />
                          <h3 className="font-semibold text-gray-900">Experience</h3>
                        </div>
                        <div className="space-y-3">
                          {profile.experiences.slice(0, 2).map((exp, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                              <div className="font-medium text-gray-900">{exp.position}</div>
                              <div className="text-sm text-gray-600">{exp.organization}</div>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{exp.description}</p>
                            </div>
                          ))}
                          {profile.experiences.length > 2 && (
                            <div className="text-sm text-gray-500">
                              +{profile.experiences.length - 2} more experiences
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg">No mentors found.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}