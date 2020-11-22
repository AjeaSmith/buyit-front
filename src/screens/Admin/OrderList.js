import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminListMyOrders } from "../../actions/orderActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import moment from "moment";
const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  // user state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // order list state
  const ordersListAdmin = useSelector((state) => state.ordersListAdmin);
  const { loading, orders, error } = ordersListAdmin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(adminListMyOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{moment(order.createdAt).format("YYYY-MM-DD")}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      moment(order.paidAt).format("YYYY-MM-DD")
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      moment(order.deliveredAt).format("YYYY-MM-DD")
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default OrderList;
