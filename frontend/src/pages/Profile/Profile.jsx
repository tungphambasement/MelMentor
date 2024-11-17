export default function Profile(){
    return(
        <div>
            <div class="container mt-5">
            <div class="row">
            <div class="col">
            </div>
            <div class="col-9">
              <div class="card">
                <div class="card-header">
                  <h3>Your Profile</h3>
                </div>
                    <div class="card-body">
                    <div class="row align-items-center">
                    <div class="col text-center">
                    <img width="300px" src="https://via.placeholder.com/150" alt="Profile Picture" class="rounded-circle mb-3" id="profileImage"/>
                    </div>
                    <div class="col">
                    <p><strong>Name:</strong> John Doe</p>
                                          <p><strong>Email:</strong> johndoe@example.com</p>
                                          <p><strong>Major 1:</strong> johndoe@example.com</p>
                                          <p><strong>Major 2:</strong> johndoe@example.com</p>
                                          <p><strong>Class Year:</strong> johndoe@example.com</p>
                                          <p><strong>About Me:</strong> A short bio about yourself...</p>
                                          <p><strong>Resume:</strong> A short bio about yourself...</p>
                                          <p><strong>Resume:</strong> <a href="#" id="resumeLink">Download Resume</a></p>
                                          <br/>
                                          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProfileModal">Edit Profile</button>
                    </div>

                    <div class="row">
                    <div class="col">

                    </div>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="col">
                                </div>
                </div>


              <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="editProfileModalLabel">Edit Profile</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-3">
                          <label for="nameInput" class="form-label">Name</label>
                          <input type="text" class="form-control" id="nameInput" placeholder="Enter your name" value="John Doe"/>
                        </div>
                        <div class="mb-3">
                          <label for="emailInput" class="form-label">Email</label>
                          <input type="email" class="form-control" id="emailInput" placeholder="Enter your email" value="johndoe@example.com"/>
                        </div>
                        <div class="mb-3">
                                                  <label for="nameInput" class="form-label">Major 1</label>
                                                  <input type="text" class="form-control" id="nameInput" placeholder="Enter your major" value="John Doe"/>
                                                </div>
                        <div class="mb-3">
                                                  <label for="nameInput" class="form-label">Major 2</label>
                                                  <input type="text" class="form-control" id="nameInput" placeholder="Enter your second major (optional)" value="John Doe"/>
                                                </div>
                        <div class="mb-3">
                          <label for="emailInput" class="form-label">Class Year</label>
                          <input type="email" class="form-control" id="emailInput" placeholder="Enter your class year" value="johndoe@example.com"/>
                        </div>
                        <div class="mb-3">
                          <label for="aboutInput" class="form-label">About Me</label>
                          <textarea class="form-control" id="aboutInput" rows="3" placeholder="Write something about yourself">A short bio about yourself...</textarea>
                        </div>
                        <div class="mb-3">
                          <label for="aboutInput" class="form-label">About Me</label>
                          <textarea class="form-control" id="aboutInput" rows="3" placeholder="Write something about yourself">A short bio about yourself...</textarea>
                        </div>
                        <div class="mb-3">
                                      <label for="resumeInput" class="form-label">Resume</label>
                                      <input type="file" class="form-control" id="resumeInput" accept=".pdf,.doc,.docx"/>
                                      <small class="text-muted">Upload a PDF or Word document</small>
                                    </div>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        </div>

    );
}