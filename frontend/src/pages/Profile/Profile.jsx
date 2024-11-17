import { useContext, useEffect, useState } from "react";
import { getProfile } from "../../services/user.service";
import { AuthContext } from "../../services/auth.service";
import { useParams } from "react-router-dom";
import { updateProfile } from "../../services/user.service";
import './profile.scss';

export default function Profile() {
    const [profile, setProfile] = useState({
        username: "",
        email: "",
    });
    const { user } = useContext(AuthContext);
    const requiredDetails = ["selfImages", "description", "experiences", "major1", "major2"];
    const [expCnt, setExpCnt] = useState(0);
    const [newProfileData, setNewProfileData] = useState({
        selfImages: [],
        description: "",
        experiences: [],  // Changed to array
        major1: "",
        major2: ""
    });

    function capitalizeFirstLetter(text) {
        if(!text) return;
        let textWithoutUnderscore = text.replace(/_/g, ' ');
        // Convert the entire string to lowercase first, then capitalize the first letter
        return textWithoutUnderscore
            .toLowerCase() // Convert the entire string to lowercase
            .split(' ')    // Split the string into an array of words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
            .join(' ');
    }

    const { id } = useParams();

    const fetchData = async () => {
        const res = await getProfile(id);
        res.major1 = capitalizeFirstLetter(res.major1);
        res.major2 = capitalizeFirstLetter(res.major2);
        setProfile(res);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(profile);
    }, [profile]);

    function handleDetailChange(e) {
        setNewProfileData((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            };
        });
    }

    function handleIncreaseExperience() {
        setNewProfileData((prev) => ({
            ...prev,
            experiences: [
                ...prev.experiences,
                { organization: "", position: "", description: "" }
            ]
        }));
        setExpCnt((prev) => prev + 1);
    }

    function handleExperienceChange(e, index) {
        const { name, value } = e.target;
        setNewProfileData((prev) => {
            const updatedExperiences = [...prev.experiences];
            updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
            return { ...prev, experiences: updatedExperiences };
        });
    }

    function submitProfileChanges() {
        const response = updateProfile(newProfileData);
        console.log(response);
    }

    return (
        <div className="container mt-5">
            {!profile ? "Loading" : (
                <div>
                    <div className="row">
                        <div className="col" />
                        <div className="col-10">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Your Profile</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col text-center">
                                            <img
                                                width="300px"
                                                src="https://via.placeholder.com/150"
                                                alt="Profile Picture"
                                                className="rounded-circle mb-3"
                                                id="profileImage"
                                            />
                                        </div>
                                        {profile ? (
                                            <div className="col">
                                                <p><strong>{profile.username}</strong></p>
                                                <p><strong>Email:</strong> {profile.email}</p>
                                                <p><strong>Major 1:</strong> {profile.major1 || "Undecided"}</p>
                                                <p><strong>Major 2:</strong> {profile.major2 || "Undecided"}</p>
                                                <p><strong>Class Year:</strong> {profile.seniority}</p>
                                                <p><strong>About Me:</strong> {profile.description}</p>
                                                <p></p>
                                                <p><strong>Resume:</strong> <a href="#" id="resumeLink">Download Resume</a></p>
                                                <br />
                                                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProfileModal">Edit Profile</button>
                                            </div>
                                        ) : "Loading"}
                                        <div className="row">
                                            <div className="col" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col" />
                    </div>

                    <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editProfileModalLabel">Edit Profile</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="nameInput" className="form-label">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nameInput"
                                                placeholder="Enter your name"
                                                value={profile.username}
                                                onChange={handleDetailChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="emailInput" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="emailInput"
                                                placeholder="Enter your email"
                                                value={profile.email}
                                                name="email"
                                                onChange={handleDetailChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Major 1</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your first major"
                                                value={capitalizeFirstLetter(newProfileData.major1)}
                                                name="major1"
                                                onChange={handleDetailChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Major 2</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your second major (optional)"
                                                value={capitalizeFirstLetter(newProfileData.major2)}
                                                name="major2"
                                                onChange={handleDetailChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Class Year</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your class year"
                                                value={newProfileData.seniority}
                                                name="seniority"
                                                onChange={handleDetailChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="aboutInput" className="form-label">About Me</label>
                                            <textarea
                                                className="form-control"
                                                id="aboutInput"
                                                rows="3"
                                                placeholder="Write something about yourself"
                                                name="description"
                                                value={newProfileData.description}
                                                onChange={handleDetailChange}
                                            />
                                        </div>
                                        {newProfileData.experiences.map((experience, index) => (
                                            <div key={index} className="experience-group">
                                                <div className="idk">
                                                    <input
                                                        value={experience.organization}
                                                        name="organization"
                                                        placeholder="Organization"
                                                        onChange={(e) => handleExperienceChange(e, index)}
                                                        className="organization"
                                                    />
                                                    <input
                                                        value={experience.position}
                                                        name="position"
                                                        placeholder="Position"
                                                        onChange={(e) => handleExperienceChange(e, index)}
                                                        className="position"
                                                    />

                                                </div>
                                                <textarea
                                                    value={experience.description}
                                                    name="description"
                                                    placeholder="Description"
                                                    onChange={(e) => handleExperienceChange(e, index)}
                                                    className="description"
                                                />
                                            </div>
                                        ))}
                                        <button type="button" onClick={handleIncreaseExperience} className="experience-btn">Add experience slot</button>
                                        <div className="mb-3">
                                            <label htmlFor="resumeInput" className="form-label">Resume</label>
                                            <input type="file" className="form-control" id="resumeInput" accept=".pdf,.doc,.docx" />
                                            <small className="text-muted">Upload a PDF or Word document</small>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={submitProfileChanges}
                                            data-bs-dismiss="modal">Save Changes</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
