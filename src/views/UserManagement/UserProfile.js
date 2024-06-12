import React, { useEffect, useState } from "react";
import "../ContentManagement/Professionform.css"; // Import your CSS file for styling
import Select from "react-select";
import { addUser } from "Apis/User";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router";
import { getUser } from "Apis/User";
import { editUser } from "Apis/User";

const User = ({ goBack }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState({
    permission1: false,
    permission2: false,
    permission3: false,
    permission4: false,
  });
  const history = useHistory();
  const { id } = useParams();
  console.log(id);
  const fetchUserById = async (id) => {
    const user = await getUser(id);
    setName(user.data.name);
    setEmail(user.data.username);
    setMobile(user.data.mobile);
    setRole(options.find((item) => item.value == user.data.designation));
    const setPermissionsFromArray = () => {
      const updatedPermissions = { ...permissions }; // Create a copy of the current permissions state

      // Iterate over the permissions array
      user.data.permissions.forEach((permission) => {
        updatedPermissions[permission] = true; // Set the permission to true in the updatedPermissions object
      });

      // Update the state with the updated permissions object
      setPermissions(updatedPermissions);
    };

    // Call the function to update the state with permissions from the array
    setPermissionsFromArray();
  };

  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
  }, [id]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleRoleChange = (selectedOption) => setRole(selectedOption);
  const handlePermissionChange = (e) => {
    setPermissions({
      ...permissions,
      [e.target.name]: e.target.checked,
    });
  };
  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    setPermissions({
      permission1: isChecked,
      permission2: isChecked,
      permission3: isChecked,
      permission4: isChecked,
    });
  };
  const handleMobileChange = (e) => setMobile(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword && !id) {
      toast.error("Passwords do not match");
      return;
    }
    const formData = {
      name,
      username: email,
      password: id ? undefined : password,
      mobile,
      designation: role ? role.value : null,
      permissions: Object.keys(permissions).filter((key) => permissions[key]),
    };
    if (id) {
      const res = await editUser(id, formData);
      if (res.errors) {
        toast.error(res.message);
      } else {
        toast.success("User updated successfully");
        history.push("/admin/userlist");
      }
    } else {
      const res = await addUser(formData);
      if (res.errors) {
        toast.error(res.message);
      } else {
        toast.success("User created successfully");
        history.push("/admin/userlist");
      }
    }
  };

  const options = [
    { value: "Account Executive", label: "Account Executive" },
    {
      value: "Customer Support Specialist",
      label: "Customer Support Specialist",
    },
    { value: "Business System Analyst", label: "Business System Analyst" },
    {
      value: "Client Facing Product Specialist",
      label: "Strategic Finance Operations",
    },
  ];

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div style={styles.container}>
            <div style={styles.title}>{"Add Account"}</div>
            <div style={styles.container2}>
              <div style={styles.cancelButton}>
                <button
                  type="button"
                  className="cancelbtn mr-1"
                  onClick={() => window.history.back()}
                >
                  {"Cancel"}
                </button>
              </div>
              <div style={styles.addButton}>
                <button type="submit" className="addaccountBtn">
                  {id ? "Edit Account" : "Add Account"}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3 ml-2">
            <div className="form-group">
              <label htmlFor="name">Name*</label>
              <input
                type="text"
                className="profession-input-title"
                placeholder="Name"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">UserName*</label>
              <input
                type="text"
                className="profession-input-title"
                placeholder="Email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile#*</label>
              <input
                type="tel"
                className="profession-input-title"
                placeholder="Mobile"
                id="mobile"
                value={mobile}
                onChange={handleMobileChange}
                pattern="[0-9]{10,14}"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                className="profession-input-title"
                placeholder="Password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                minLength="8"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <input
                type="password"
                className="profession-input-title"
                placeholder="Confirm Password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                minLength="8"
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">Choose Role</label>
              <div className="d-flex row" style={{ marginLeft: "2px" }}>
                <Select
                  styles={colourStyles}
                  options={options}
                  value={role}
                  onChange={handleRoleChange}
                  required
                />
              </div>
            </div>

            <div
              className="d-flex justify-content-between"
              style={{ width: "610px" }}
            >
              <p className="permission-heading">Permissions</p>{" "}
              <div>
                <input
                  type="checkbox"
                  id="selectAll"
                  name="selectAll"
                  checked={Object.values(permissions).every(Boolean)}
                  onChange={handleSelectAllChange}
                  className="mr-1"
                />
                <label htmlFor="selectAll">Select All</label>
              </div>
            </div>
            <div className="d-flex-column">
              <div className="mb-3">
                <input
                  type="checkbox"
                  id="permission1"
                  name="permission1"
                  checked={permissions.permission1}
                  onChange={handlePermissionChange}
                  className="mr-1"
                />
                <label htmlFor="permission1">Permission 1</label>
              </div>
              <div className="mb-3">
                <input
                  type="checkbox"
                  id="permission2"
                  name="permission2"
                  checked={permissions.permission2}
                  onChange={handlePermissionChange}
                  className="mr-1"
                />
                <label htmlFor="permission2">Permission 2</label>
              </div>
              <div className="mb-3">
                <input
                  type="checkbox"
                  id="permission3"
                  name="permission3"
                  checked={permissions.permission3}
                  onChange={handlePermissionChange}
                  className="mr-1"
                />
                <label htmlFor="permission3">Permission 3</label>
              </div>
              <div className="mb-3">
                <input
                  type="checkbox"
                  id="permission4"
                  name="permission4"
                  checked={permissions.permission4}
                  onChange={handlePermissionChange}
                  className="mr-1"
                />
                <label htmlFor="permission4">Permission 4</label>
              </div>
            </div>
            <br />
          </div>
        </form>
      </div>
    </>
  );
};

const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    width: "610px",
    height: "45px",
  }),
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ccc",
    width: "100%",
    height: "50px",
    borderBlockEnd: "none",
  },
  container2: {
    display: "flex",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  search: {
    marginRight: "10px",
  },
  addButton: {
    marginLeft: "auto",
  },
};

export default User;
