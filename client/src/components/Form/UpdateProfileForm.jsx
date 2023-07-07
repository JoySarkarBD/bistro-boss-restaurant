import { Toaster } from "react-hot-toast";
import FormBtn from "./FormBtn";
import TextInput from "./TextInput";

const UpdateProfileForm = () => {
  return (
    <div>
      <form encType="multipart/form-data">
        <div className="grid grid-cols-6 gap-y-3 gap-x-6">
          {/* first name */}
          <div className="col-span-3 mb-2">
            <TextInput
              title="First Name"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
            />
          </div>

          {/* last name */}
          <div className="col-span-3 mb-2">
            <TextInput
              title="Last Name"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
            />
          </div>

          {/* username */}
          <div className="col-span-3 mb-2">
            <TextInput
              title="Username"
              type="text"
              id="username"
              name="username"
              placeholder="Enter a username"
            />
          </div>

          {/* email */}
          <div className="col-span-3 mb-2">
            <TextInput
              title="Email"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          {/* password */}
          <div className="col-span-3 mb-2 relative">
            <TextInput
              title="Password"
              type="password"
              id="password"
              name="password"
              placeholder="Choose a password"
            />
          </div>

          {/*confirm password */}
          <div className="col-span-3 mb-2">
            <TextInput
              title="Confirm Password"
              type="text"
              id="confirmPassword "
              name="confirmPassword"
              placeholder="Enter confirm password"
            />
          </div>
        </div>

        <div>
          <FormBtn title="Update" />
          <Toaster />
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
