import classes from "./UserList.module.css";

const UserList = (props: any) => {
  return (
    <ul className={classes.list}>
      {props.list.map((user: any) => (
        <div
          className={classes.user}
          key={user.id}
          onClick={props.onRemoveUser.bind(this, user.id)}
        >
          <div>
            <div>{user.firstname}</div>
            <div>{user.lastname}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default UserList;
