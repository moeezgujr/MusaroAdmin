import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./style.css";
import Header from "./TableHeader";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { userList } from "Apis/User";
import { TableWithPagination } from "./Table";
import { deleteUser } from "Apis/User";
import { toast } from "react-toastify";
import { searchUser } from "Apis/User";
import NoAccountsFound from "./NoDataFound";

function UserList() {
  const handleClick = (title) => {
    console.log(`You clicked me! ${title}`);
  };
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchTotalCount = async (page) => {
    try {
      const data = await userList(page);
      setUsers(data.data.users);
      setPagination(data.data.meta);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const searchUsers = async (page, search) => {
    try {
      const data = await searchUser(page, search);
      setUsers(data.data.users);
      setPagination(data.data.meta);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTotalCount(0);
  }, []);

  const columns = [
    { value: "name", label: "Name" },
    { value: "username", label: "Username" },
    { value: "role", label: "Role" },
  ];

  const paginationCallback = (val) => {
    fetchTotalCount(val - 1);
  };

  const actionCallback = async (type, id) => {
    console.log(type, id);
    if (type === "delete") {
      const res = await deleteUser(id);
      if (res.message === "Success") {
        fetchTotalCount(0);
        toast.success("User deleted Successfully");
      }
    }
    if (type === "edit") {
      history.push("/admin/edituser/" + id);
    }
  };
  const onSearchCallback = (e) => {
    searchUsers(0, e.target.value);
  };
  return (
    <>
      <Header
        btntext={"Add Account"}
        onSearch={onSearchCallback}
        title={"User Management"}
        icon
        onAddAccount={() => history.push("/admin/adduser")}
      />
      {loading ? (
        <div id="customers" style={{ border: "none" }}>
          <Skeleton height={40} count={5} style={{ marginBottom: 10 }} />
          <Skeleton
            height={40}
            count={1}
            style={{ marginBottom: 10, width: "50%" }}
          />
        </div>
      ) : users.length > 0 ? (
        <TableWithPagination
          data={users}
          headers={columns}
          onPageChange={paginationCallback}
          totalPages={pagination.pages}
          currentPage={pagination.page}
          callback={actionCallback}
          isPaginationShow={pagination.pages > 1 && true}
        />
      ) : (
        <NoAccountsFound id="user" />
      )}
    </>
  );
}

export default UserList;
