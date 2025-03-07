import { useState, useEffect } from "react";
import "./PaymentList.css";

export default function PaymentList() {
  const [orderList, setOrderList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusMap = {
    ยกเลิก: "Canceled",
    ชำระแล้ว: "Paid",
    รอชำระ: "Pending Payment",
  };

  function handleOrderCache(orderId) {
    fetch("/Payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_order: orderId }),
    });
  }

  function handlConfirm(confirm, payment_method) {
    fetch("/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        confirm: confirm,
        payment_method: payment_method,
      }),
    });
    window.location.reload();
    alert("ดำเนินการเรียบร้อย");
  }

  useEffect(() => {
    async function getOrderList() {
      const resp = await fetch("/sendOrder");
      const data = await resp.json();
      setOrderList(data.results || []);
    }
    getOrderList();
  }, []);

  async function fetchOrderDetails(order_id) {
    setSelectedOrder(null);
    const resp = await fetch(`/order-details/${order_id}`);
    const data = await resp.json();
    setSelectedOrder(data);

    handleOrderCache(order_id);
  }

  return (
    <div className="Order">
      <div className="center">
        <h2>Order List</h2>
        <table border="1" className="orderList">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer ID</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr
                key={order.order_id}
                className="orderList__item"
                onClick={() => fetchOrderDetails(order.order_id)}
                style={{ cursor: "pointer" }}
              >
                <td>{order.order_id}</td>
                <td>{order.customer_id}</td>
                <td>
                  {new Date(order.order_date).toLocaleString("th-TH", {
                    timeZone: "Asia/Bangkok",
                  })}
                </td>
                <td
                  className={`orderList__status orderList__status--${
                    statusMap[order.status]?.replace(" ", "") || "Unknown"
                  }`}
                >
                  {statusMap[order.status] || order.status}
                </td>
                <td>{order.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedOrder && (
          <div className="orderDetails">
            <h2>Order Details</h2>
            <p>
              <strong>Order ID:</strong> {selectedOrder.order_id}
            </p>
            <p>
              <strong>Customer ID:</strong> {selectedOrder.customer_id}
            </p>
            <p>
              <strong>Customer Name:</strong> {selectedOrder.customer_name}
            </p>

            <p>
              <strong>Order Date:</strong>
              {new Date(selectedOrder.order_date).toLocaleString("th-TH", {
                timeZone: "Asia/Bangkok",
              })}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {statusMap[selectedOrder.status] || selectedOrder.status}
            </p>
            <p>
              <strong>Total:</strong> {selectedOrder.total_amount}
            </p>
            <h3>Items:</h3>
            <table border="1">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item) => {
                  return (
                    <tr key={item.product_id}>
                      <td>{item.product_id}</td>
                      <td>{item.product_name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {statusMap[selectedOrder.status] === "Pending Payment" && (
              <div className="btnG">
                <button
                  className="btnPayment"
                  onClick={() => handlConfirm("pay", "ธนาคาร")}
                >
                  Payment
                </button>
                <button
                  className="btnCanceled"
                  onClick={() => handlConfirm("cancel", "")}
                >
                  Canceled
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
