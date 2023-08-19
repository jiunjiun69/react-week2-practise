function OrderItem({ item, updateOrderItem, removeOrderItem, calculateSubtotal }) {
    return (
        <tr key={item.id}>
            <td>
                <button 
                    type="button" 
                    className="btn btn-sm"
                    onClick={() => removeOrderItem(item.id)}
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
                    onChange={(e) => updateOrderItem(item.id, parseInt(e.target.value, 10))}
                />
            </td>
            <td>{item.price}</td>
            <td>{calculateSubtotal(item)}</td>
        </tr>
    );
}

export default OrderItem;
