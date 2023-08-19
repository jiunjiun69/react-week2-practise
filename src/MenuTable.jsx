import data from "./data";
import { useState } from 'react';
import MenuItem from './MenuItem';
import OrderItem from './OrderItem';
import OrderRecord from './OrderRecord';

function MenuTable() {
    const [order, setOrder] = useState([]); // 儲存訂單內容
    const [notes, setNotes] = useState(''); // 儲存備註內容
    const [submittedOrders, setSubmittedOrders] = useState([]); // 儲存已送出的訂單
    const [currentOrderIndex, setCurrentOrderIndex] = useState(-1); // 控制顯示的訂單索引
    const [currentTotal, setCurrentTotal] = useState(0); // 儲存購物車總計
    const [tempNotes, setTempNotes] = useState(''); // 暫存備註內容


    // 增加訂單資料
    const addOrder = (item) => {
        const existingItem = order.find(orderItem => orderItem.id === item.id);
        // 如果訂單已經存在，則增加數量
        if (existingItem) {
            const updataOrder = order.map(orderItem =>
                orderItem.id === item.id 
                ? { ...orderItem, quantity: orderItem.quantity + 1 } // 增加訂單數量的屬性
                : orderItem
            );
            setOrder(updataOrder)
        } else {
            // 如果訂單不存在，則增加新項目到訂單
            setOrder([...order, { ...item, quantity: 1 }]);
        }
    };

    // 計算小計
    const calculateSubtotal = (item) => {
        return item.price * item.quantity;
    };

     // 計算總價
    const calculateTotal = () => {
        return order.reduce((total, item) => total + calculateSubtotal(item), 0);
    };

    // 送出訂單到購物車
    const handleSubmitOrder = () => {
        if (order.length > 0) {
            const newTotal = calculateTotal([...order, ...submittedOrders.flat()]); //降維
            const newSubmittedOrder = [...submittedOrders, order];
            setSubmittedOrders(newSubmittedOrder);
            setCurrentOrderIndex(newSubmittedOrder.length - 1); // 使用新的訂單索引
            setOrder([]);
            setCurrentTotal(newTotal); // 更新總計價格
            setTempNotes('');
        }
    };
    

    // 更新訂單項目數量
    const updateOrderItem = (itemId, newQuantity) => {
        const updatedOrder = order.map((orderItem) =>
            orderItem.id === itemId
                ? { ...orderItem, quantity: newQuantity }
                : orderItem
        );
        setOrder(updatedOrder);
    };
    // 移除訂單項目
    const removeOrderItem = (itemId) => {
        const updatedOrder = order.filter((orderItem) => orderItem.id !== itemId);
        setOrder(updatedOrder);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    {/* 選擇項目 */}
                    <div className="list-group">
                        {/* {data.map((item) => (
                            <a href="#" className="list-group-item list-group-item-action" key={item.id} onClick={() => addOrder(item)}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{item.name}</h5>
                                    <small>{item.price}</small>
                                </div>
                                <p className="mb-1">{item.description}</p>
                            </a>
                        ))} */}
                        {data.map((item) => (
                            <MenuItem key={item.id} item={item} addOrder={addOrder} />
                        ))}
                    </div>
                </div>

                {/* 調整訂單內容 */}
                <div className="col-md-8">
                    <table className="table">
                    <thead>
                        <tr>
                        <th scope="col" width="50">操作</th>
                        <th scope="col">品項</th>
                        <th scope="col">描述</th>
                        <th scope="col" width="90">數量</th>
                        <th scope="col">單價</th>
                        <th scope="col">小計</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {order.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-sm"
                                        onClick={()=>{
                                            const updataOrder = order.filter(orderItem => orderItem.id !== item.id);
                                            setOrder(updataOrder);
                                        }}
                                    >
                                        x
                                    </button>
                                </td>
                                <td>{item.name}</td>
                                <td><small>{item.description}</small></td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.quantity}
                                        onChange={(e) => {
                                            const newQuantity = parseInt(e.target.value, 10);
                                            if (newQuantity >= 1) {
                                                const updatedOrder = order.map(orderItem =>
                                                    orderItem.id === item.id
                                                        ? { ...orderItem, quantity: newQuantity }
                                                        : orderItem
                                                );
                                                setOrder(updatedOrder);
                                            }
                                        }}
                                    />
                                </td>
                                <td>{item.price}</td>
                                <td>{calculateSubtotal(item)}</td>
                            </tr>
                        ))} */}
                        {order.map((item) => (
                            <OrderItem
                                key={item.id}
                                item={item}
                                updateOrderItem={updateOrderItem}
                                removeOrderItem={removeOrderItem}
                                calculateSubtotal={calculateSubtotal} // 傳遞 calculateSubtotal 函式
                            />
                        ))}
                    </tbody>
                    </table>
                    <div className="text-end mb-3">
                        <h5>總計: <span>${calculateTotal()}</span></h5>
                    </div>
                    <textarea
                        className="form-control mb-3"
                        rows="3"
                        placeholder="備註"
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                    ></textarea>
                    <div className="text-end">
                        <button 
                            className="btn btn-primary"
                            onClick={() => {
                                setNotes(tempNotes); // 更新備註
                                handleSubmitOrder();
                            }}
                        >送出</button>
                    </div>
                </div>
            </div>
            <hr />
            {/* 購物車訂單紀錄 */}
            <div className="row justify-content-center">
                <div className="col-8">
                    {currentOrderIndex !== -1 && (
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <h5>訂單</h5>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">品項</th>
                                                <th scope="col">數量</th>
                                                <th scope="col">小計</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {submittedOrders[currentOrderIndex].map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{calculateSubtotal(item)}</td>
                                                </tr>
                                            ))} */}
                                            {submittedOrders[currentOrderIndex].map((item) => (
                                                <OrderRecord
                                                    key={item.id}
                                                    item={item}
                                                    calculateSubtotal={calculateSubtotal}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="text-end">備註: <span>{notes}</span></div>
                                    <div className="text-end">
                                        <h5>總計: <span>${currentTotal}</span></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MenuTable;